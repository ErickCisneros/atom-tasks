import { onCall } from 'firebase-functions/v2/https';
import { onDocumentWritten } from 'firebase-functions/v2/firestore';
import * as admin from 'firebase-admin';
import * as logger from 'firebase-functions/logger';

admin.initializeApp();
const db = admin.firestore();

// Endpoint: GET /tasks - Get the list of all tasks
export const getTasks = onCall(async ({ data }, context) => {
  try {
    const snapshot = await db.collection('tasks').get();
    const tasks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return { success: true, tasks };
  } catch (error) {
    logger.error('Error getting tasks:', error);
    return { success: false, error: 'Error getting tasks' };
  }
});

// Endpoint: POST /tasks - Add a new task
export const createTask = onCall(async ({ data }, context) => {
  try {
    const newTask = data;
    const docRef = await db.collection('tasks').add(newTask);
    return { success: true, id: docRef.id, ...newTask };
  } catch (error) {
    logger.error('Error creating task:', error);
    return { success: false, error: 'Error creating task' };
  }
});

// Endpoint: PUT /tasks/{taskId} - Update an existing task
export const updateTask = onCall(async ({ data }, context) => {
  const { taskId, updatedTask } = data;
  try {
    await db.collection('tasks').doc(taskId).update(updatedTask);
    return { success: true, message: 'Task updated successfully' };
  } catch (error) {
    logger.error('Error updating task:', error);
    return { success: false, error: 'Error updating task' };
  }
});

// Endpoint: DELETE /tasks/{taskId} - Delete an existing task
export const deleteTask = onCall(async ({ data }, context) => {
  const { taskId } = data;
  try {
    await db.collection('tasks').doc(taskId).delete();
    return { success: true, message: 'Task deleted successfully' };
  } catch (error) {
    logger.error('Error deleting task:', error);
    return { success: false, error: 'Error deleting task' };
  }
});

// Endpoint: GET /users/{email} - Search for a user by email
export const getUserByEmail = onCall(async ({ data }, context) => {
  const { email } = data;
  try {
    const snapshot = await db
      .collection('users')
      .where('email', '==', email)
      .get();
    if (snapshot.empty) {
      return { success: false, message: 'User not found' };
    } else {
      const user = snapshot.docs[0].data();
      return { success: true, user };
    }
  } catch (error) {
    logger.error('Error searching user:', error);
    return { success: false, error: 'Error searching user' };
  }
});

// Endpoint: POST /users - Add a new user
export const createUser = onCall(async ({ data }, context) => {
  try {
    const newUser = data;
    const docRef = await db.collection('users').add(newUser);
    return { success: true, id: docRef.id, ...newUser };
  } catch (error) {
    logger.error('Error creating user:', error);
    return { success: false, error: 'Error creating user' };
  }
});

// Function: Log Firestore events when a task changes
export const onTaskChange = onDocumentWritten('tasks/{taskId}', (event) => {
  const beforeData = event.data?.before.data();
  const afterData = event.data?.after.data();
  logger.info('Task modified:', {
    before: beforeData,
    after: afterData,
  });
});
