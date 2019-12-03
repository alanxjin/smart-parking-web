import fb from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyAZ7kVfUkG6D-04t4Io8F2OwzZwNRhtb5M",
    authDomain: "ismart-parking-meter.firebaseapp.com",
    databaseURL: "https://ismart-parking-meter.firebaseio.com",
    projectId: "ismart-parking-meter",
    storageBucket: "ismart-parking-meter.appspot.com",
    messagingSenderId: "860777835594",
    appId: "1:860777835594:web:b8064ab97e365a9a840ab3",
    measurementId: "G-9Y20CKPN4K"
};

fb.initializeApp(firebaseConfig);
var db = fb.firestore();
export { fb,db };
