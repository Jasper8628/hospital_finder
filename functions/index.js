const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
admin.initializeApp()

exports.getPatients = functions.region('australia-southeast1').https.onRequest((req, res) => {
  cors(req, res, () => {
    admin.firestore()
      .collection('patients')
      .get()
      .then(doc => {
        res.json({ message: 'suc', data: doc.docs })
      })
      .catch(err => {
        res.status(500).json({ error: 'error' })
        console.error(err);
      })
  })
});
exports.addPatient = functions.region('australia-southeast1').https.onRequest((req, res) => {
  cors(req, res, () => {
    const data = req.body.body;
    admin.firestore()
      .collection('patients')
      .add(data)
      .then(doc => {
        res.json({ message: `document ${doc.id} successful` })
      })
      .catch(err => {
        res.status(500).json({ error: 'error' })
        console.error(err);
      })
  })
});
exports.deletePatient = functions.region('australia-southeast1').https.onRequest((req, res) => {
  cors(req, res, () => {
    const id = req.body.id;
    console.log('logging ID: ', req.body)
    admin.firestore()
      .collection('patients')
      .doc(id)
      .delete()
      .then(doc => {
        res.json({ message: `document ${doc.id} successful` })
      })
      .catch(err => {
        res.status(500).json({ error: 'error' })
        console.error(err);
      })
  })
});
