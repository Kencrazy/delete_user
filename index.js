const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); 

const serviceAccount = require('/etc/secrets/g-edu-4c960-firebase-adminsdk-fbsvc-16c2b59ed9.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.delete('/delete-user/:uid', async (req, res) => {
  const uid = req.params.uid;
  try {
    await admin.auth().deleteUser(uid);
    console.log(`Successfully deleted user: ${uid}`);
    res.status(200).json({ message: `User ${uid} deleted successfully.` });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Failed to delete user.', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
