import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from datetime import datetime

cred = credentials.Certificate('ismart-parking-meter-firebase-adminsdk-7ed7y-9a268ab07d.json')

firebase_admin.initialize_app(cred)

db = firestore.client()

# Change this
slot = u'slot3'



def startParking(slot):
    now = datetime.now()
    current_time = now.strftime(u"%H:%M:%S")
    slots_ref = db.collection(u'slots').document(slot)
    slots_ref.update({
        u'availability': 0,
        u'start_time': current_time
    })

def endParking(slot):
    slots_ref = db.collection(u'slots').document(slot)
    slots_ref.update({
        u'availability': 1,
        u'start_time': None
    })

startParking(slot)
# endParking(slot)


