import express, { Request, Response } from 'express';
import * as admin from 'firebase-admin';
import * as logger from 'firebase-functions/logger';
import { https } from 'firebase-functions/v2';
const cors = require('cors');

const app = express();
app.use(cors());

admin.initializeApp();
const db = admin.firestore();

app.get('/api/tasks', async (request: Request, response: Response) => {
  try {
    const snapshot = await db
      .collection('tasks')
      .orderBy('createdAt', 'asc')
      .get();
    const tasks = snapshot.docs.map((doc) => {
      const data = doc.data();
      return { id: doc.id, ...data };
    });
    response.status(200).json(tasks);
  } catch (error) {
    logger.error('Error getting tasks:', error);
    response.status(400).json({ success: false, error: 'Error getting tasks' });
  }
});

app.post('/api/tasks', async (request: Request, response: Response) => {
  try {
    const newTask = request.body;
    const docRef = await db.collection('tasks').add({ ...newTask });
    response.status(200).json({
      success: true,
      id: docRef.id,
      ...newTask,
    });
  } catch (error) {
    logger.error('Error creating task:', error);
    response.status(400).json({ success: false, error: 'Error creating task' });
  }
});

app.put('/api/tasks/:taskId', async (request: Request, response: Response) => {
  const { taskId } = request.params;
  const updatedTask = request.body;
  try {
    await db
      .collection('tasks')
      .doc(taskId)
      .update({ ...updatedTask });
    response
      .status(200)
      .json({ success: true, message: 'Task updated successfully' });
  } catch (error) {
    logger.error('Error updating task:', error);
    response.status(200).json({ success: false, error: 'Error updating task' });
  }
});

app.delete(
  '/api/tasks/:taskId',
  async (request: Request, response: Response) => {
    const { taskId } = request.params;
    try {
      await db.collection('tasks').doc(taskId).delete();
      response
        .status(200)
        .json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
      logger.error('Error deleting task:', error);
      response
        .status(200)
        .json({ success: true, error: 'Error deleting task' });
    }
  },
);

app.get('/api/users/:email', async (request: Request, response: Response) => {
  const { email } = request.params;
  try {
    const snapshot = await db
      .collection('users')
      .where('email', '==', email)
      .get();
    if (snapshot.empty) {
      response.status(200).json({ id: null, email: null });
    } else {
      const user = snapshot.docs[0].data();
      response.status(200).json({ id: snapshot.docs[0].id, ...user });
    }
  } catch (error) {
    logger.error('Error searching user:', error);
    response
      .status(400)
      .json({ success: false, error: 'Error searching user' });
  }
});

app.post('/api/users', async (request: Request, response: Response) => {
  try {
    const newUser = request.body;
    const snapshot = await db
      .collection('users')
      .where('email', '==', newUser.email)
      .get();
    if (snapshot.empty) {
      const docRef = await db.collection('users').add(newUser);
      response.status(200).json({ id: docRef.id, ...newUser });
    } else {
      response.status(200).json({ id: snapshot.docs[0].id, ...newUser });
    }
  } catch (error) {
    logger.error('Error creating user:', error);
    response.status(400).json({ success: false, error: 'Error creating user' });
  }
});

exports.app = https.onRequest(app);
