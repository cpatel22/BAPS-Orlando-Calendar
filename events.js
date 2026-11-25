/* =====================================================================
   BAPS Orlando Calendar — SHARED EVENT DATA
   Edit ONLY this file. index.html, index-v1.html and index-v2.html all
   read it, so a change here shows up on every page after a refresh.
   Keep this file in the same folder as the HTML pages.

   Each event:
     "date"   "YYYY-MM-DD"                          (required)
     "name"   display name                           (required)
     "type"   one of the names in "categories"       (required)
     "start"  "HH:MM" 24-hour, local time            (leave out for all-day, e.g. Ekadashi)
     "end"    "HH:MM" 24-hour                        (optional; defaults to start + 2h)
     "womensWing": true                              (optional)
   Order doesn't matter: pages sort by date, then start time.
   Everything after "window.BAPS_CALENDAR =" is plain JSON — keep the
   double quotes, and no comma after the last item in a list.
   ===================================================================== */
window.BAPS_CALENDAR = {
  "calendar": "BAPS Orlando Calendar 2027",
  "year": 2027,
  "timezone": "America/New_York",
  "location": {
    "name": "BAPS Shri Swaminarayan Mandir",
    "address": "1325 W Oak Ridge Rd, Orlando, FL 32809"
  },
  "icsUrl": "",
  "showSubscribe": false,
  "categories": ["Celebration", "Tithi Sabha", "Punam Mahapuja", "Ekadashi", "Parasabha", "Parayan Sabha"],
  "events": [
    {"date": "2027-01-03", "name": "Safla Ekadashi", "type": "Ekadashi"},
    {"date": "2027-01-08", "name": "Parasabha", "type": "Parasabha", "start": "19:00", "end": "21:00"},
    {"date": "2027-01-16", "name": "Patangotsav (Morning)", "type": "Celebration", "start": "09:30", "end": "11:30"},
    {"date": "2027-01-16", "name": "Jholi Parva Celebration", "type": "Celebration", "start": "17:00", "end": "19:00"},
    {"date": "2027-01-19", "name": "Putrada Ekadashi", "type": "Ekadashi"},
    {"date": "2027-01-22", "name": "Punam Mahapuja", "type": "Punam Mahapuja", "start": "18:30", "end": "20:30"},
    {"date": "2027-01-23", "name": "Parayan Sabha", "type": "Parayan Sabha", "start": "17:00", "end": "19:00"},
    {"date": "2027-02-02", "name": "Shattila Ekadashi", "type": "Ekadashi"},
    {"date": "2027-02-11", "name": "Shastriji Maharaj Janma Jayanti Tithi Sabha", "type": "Tithi Sabha", "start": "18:30", "end": "20:30"},
    {"date": "2027-02-12", "name": "Parasabha", "type": "Parasabha", "start": "19:00", "end": "21:00"},
    {"date": "2027-02-13", "name": "Vasant Panchami Celebration", "type": "Celebration", "start": "17:00", "end": "19:00"},
    {"date": "2027-02-17", "name": "Jaya Ekadashi", "type": "Ekadashi"},
    {"date": "2027-02-20", "name": "Punam Mahapuja", "type": "Punam Mahapuja", "start": "13:30", "end": "15:30"},
    {"date": "2027-02-20", "name": "Parayan Sabha", "type": "Parayan Sabha", "start": "17:00", "end": "19:00"},
    {"date": "2027-02-28", "name": "Satsang Exam (Sabha evening after exam)", "type": "Celebration", "start": "09:00", "end": "16:00"},
    {"date": "2027-03-04", "name": "Vijaya Ekadashi", "type": "Ekadashi"},
    {"date": "2027-03-12", "name": "Parasabha", "type": "Parasabha", "start": "19:00", "end": "21:00"},
    {"date": "2027-03-18", "name": "Amalaki Ekadashi", "type": "Ekadashi"},
    {"date": "2027-03-21", "name": "Punam Mahapuja", "type": "Punam Mahapuja", "start": "13:30", "end": "15:30"},
    {"date": "2027-03-21", "name": "Pragji Bhakt Jayanti Tithi Sabha & Fuldolotsav", "type": "Celebration", "start": "16:00", "end": "18:00"},
    {"date": "2027-03-27", "name": "Parayan Sabha", "type": "Parayan Sabha", "start": "17:00", "end": "19:00"},
    {"date": "2027-04-02", "name": "Papmochani Ekadashi", "type": "Ekadashi"},
    {"date": "2027-04-09", "name": "Parasabha", "type": "Parasabha", "start": "19:00", "end": "21:00"},
    {"date": "2027-04-10", "name": "Swaminarayan Jayanti Celebration", "type": "Celebration", "start": "17:00", "end": "19:00"},
    {"date": "2027-04-15", "name": "Swaminarayan Jayanti / Ramnavmi Tithi Sabha", "type": "Tithi Sabha", "start": "18:30", "end": "22:30"},
    {"date": "2027-04-17", "name": "Kamada Ekadashi", "type": "Ekadashi"},
    {"date": "2027-04-17", "name": "Parayan Sabha", "type": "Parayan Sabha", "start": "17:00", "end": "19:00"},
    {"date": "2027-04-20", "name": "Punam Mahapuja", "type": "Punam Mahapuja", "start": "18:30", "end": "20:30"},
    {"date": "2027-04-24", "name": "Swaminarayan Jayanti Celebration (Women's Wing)", "type": "Celebration", "start": "17:00", "end": "19:00", "womensWing": true},
    {"date": "2027-04-25", "name": "Walk-Run 2027", "type": "Celebration", "start": "09:00"},
    {"date": "2027-05-02", "name": "Varuthini Ekadashi", "type": "Ekadashi"},
    {"date": "2027-05-14", "name": "Parasabha", "type": "Parasabha", "start": "19:00", "end": "21:00"},
    {"date": "2027-05-15", "name": "Parayan Sabha", "type": "Parayan Sabha", "start": "17:00", "end": "19:00"},
    {"date": "2027-05-16", "name": "Mohini Ekadashi", "type": "Ekadashi"},
    {"date": "2027-05-20", "name": "Punam Mahapuja", "type": "Punam Mahapuja", "start": "18:30", "end": "20:30"},
    {"date": "2027-05-29", "name": "Yogi Jayanti Celebration", "type": "Celebration", "start": "17:00", "end": "19:00"},
    {"date": "2027-06-01", "name": "Apara Ekadashi", "type": "Ekadashi"},
    {"date": "2027-06-02", "name": "Yogiji Maharaj Jayanti Tithi Sabha", "type": "Tithi Sabha", "start": "18:30", "end": "20:30"},
    {"date": "2027-06-11", "name": "Parasabha", "type": "Parasabha", "start": "19:00", "end": "21:00"},
    {"date": "2027-06-14", "name": "Bhim (Nirjala) Ekadashi", "type": "Ekadashi"},
    {"date": "2027-06-18", "name": "Punam Mahapuja", "type": "Punam Mahapuja", "start": "18:30", "end": "20:30"},
    {"date": "2027-06-19", "name": "Mandir Patotsav", "type": "Celebration", "start": "17:00", "end": "19:00"},
    {"date": "2027-06-26", "name": "Parayan Sabha", "type": "Parayan Sabha", "start": "17:00", "end": "19:00"},
    {"date": "2027-06-30", "name": "Yogini Ekadashi", "type": "Ekadashi"},
    {"date": "2027-07-09", "name": "Parasabha", "type": "Parasabha", "start": "19:00", "end": "21:00"},
    {"date": "2027-07-14", "name": "Devshayani Ekadashi (Chaturmas begins)", "type": "Ekadashi"},
    {"date": "2027-07-17", "name": "Parayan Sabha", "type": "Parayan Sabha", "start": "17:00", "end": "19:00"},
    {"date": "2027-07-18", "name": "Punam Mahapuja", "type": "Punam Mahapuja", "start": "13:30", "end": "15:30"},
    {"date": "2027-07-18", "name": "Guru Purnima Celebration", "type": "Celebration", "start": "16:00", "end": "18:00"},
    {"date": "2027-07-30", "name": "Kamika Ekadashi", "type": "Ekadashi"},
    {"date": "2027-08-12", "name": "Pavitra Ekadashi", "type": "Ekadashi"},
    {"date": "2027-08-13", "name": "Parasabha", "type": "Parasabha", "start": "19:00", "end": "21:00"},
    {"date": "2027-08-17", "name": "Punam Mahapuja", "type": "Punam Mahapuja", "start": "18:30", "end": "20:30"},
    {"date": "2027-08-21", "name": "Parayan Sabha", "type": "Parayan Sabha", "start": "17:00", "end": "19:00"},
    {"date": "2027-08-25", "name": "Janmashtami Tithi Sabha", "type": "Tithi Sabha", "start": "18:30", "end": "20:30"},
    {"date": "2027-08-28", "name": "Aja Ekadashi", "type": "Ekadashi"},
    {"date": "2027-08-28", "name": "Janmashtami Celebration", "type": "Celebration", "start": "17:00", "end": "19:00"},
    {"date": "2027-09-10", "name": "Parasabha", "type": "Parasabha", "start": "19:00", "end": "21:00"},
    {"date": "2027-09-11", "name": "Jal Jhilani Ekadashi", "type": "Ekadashi"},
    {"date": "2027-09-11", "name": "Parayan Sabha", "type": "Parayan Sabha", "start": "17:00", "end": "19:00"},
    {"date": "2027-09-15", "name": "Punam Mahapuja", "type": "Punam Mahapuja", "start": "18:30", "end": "20:30"},
    {"date": "2027-09-18", "name": "Jal Jhilani Picnic & Ganesh Visarjan", "type": "Celebration", "start": "17:00", "end": "19:00"},
    {"date": "2027-09-25", "name": "Mahant Swami Maharaj Janma Jayanti Celebration", "type": "Celebration", "start": "17:00", "end": "19:00"},
    {"date": "2027-09-26", "name": "Indira Ekadashi", "type": "Ekadashi"},
    {"date": "2027-10-01", "name": "Bhakti Parva Garba", "type": "Celebration", "start": "20:30", "end": "22:30"},
    {"date": "2027-10-02", "name": "MSMJJ Celebration (Women's Wing)", "type": "Celebration", "start": "17:00", "end": "19:00", "womensWing": true},
    {"date": "2027-10-02", "name": "Bhakti Parva Garba", "type": "Celebration", "start": "20:30", "end": "22:30"},
    {"date": "2027-10-08", "name": "Parasabha", "type": "Parasabha", "start": "19:00", "end": "21:00"},
    {"date": "2027-10-09", "name": "Bhakti Parva Garba", "type": "Celebration", "start": "20:30", "end": "22:30"},
    {"date": "2027-10-11", "name": "Pashankusha Ekadashi", "type": "Ekadashi"},
    {"date": "2027-10-14", "name": "Punam Mahapuja (Sharad Purnima)", "type": "Punam Mahapuja", "start": "18:30", "end": "20:30"},
    {"date": "2027-10-16", "name": "Sharad Purnima Celebration", "type": "Celebration", "start": "17:00", "end": "19:00"},
    {"date": "2027-10-23", "name": "Kids' Diwali Celebration (KDC)", "type": "Celebration", "start": "13:30", "end": "15:30"},
    {"date": "2027-10-25", "name": "Rama Ekadashi", "type": "Ekadashi"},
    {"date": "2027-10-29", "name": "Diwali Chopda Pujan", "type": "Celebration", "start": "18:00", "end": "20:00"},
    {"date": "2027-10-30", "name": "Annakut Celebration", "type": "Celebration", "start": "17:00", "end": "19:00"},
    {"date": "2027-11-10", "name": "Prabodhini Ekadashi (Chaturmas ends)", "type": "Ekadashi"},
    {"date": "2027-11-12", "name": "Para Snehmilan", "type": "Celebration", "start": "19:00", "end": "21:00"},
    {"date": "2027-11-14", "name": "Punam Mahapuja", "type": "Punam Mahapuja", "start": "13:30", "end": "15:30"},
    {"date": "2027-11-14", "name": "Shak Hatdi Utsav", "type": "Celebration", "start": "16:00", "end": "19:00"},
    {"date": "2027-11-20", "name": "Parayan Sabha", "type": "Parayan Sabha", "start": "17:00", "end": "19:00"},
    {"date": "2027-11-24", "name": "Utpatti Ekadashi", "type": "Ekadashi"},
    {"date": "2027-12-04", "name": "Pramukh Swami Maharaj Janma Jayanti Celebration", "type": "Celebration", "start": "17:00", "end": "19:00"},
    {"date": "2027-12-06", "name": "Pramukh Swami Maharaj Jayanti Tithi Sabha", "type": "Tithi Sabha", "start": "18:30", "end": "20:30"},
    {"date": "2027-12-09", "name": "Mokshada Ekadashi", "type": "Ekadashi"},
    {"date": "2027-12-10", "name": "Parasabha", "type": "Parasabha", "start": "19:00", "end": "21:00"},
    {"date": "2027-12-11", "name": "Pramukh Swami Maharaj JJ Celebration (Women's Wing)", "type": "Celebration", "start": "17:00", "end": "19:00", "womensWing": true},
    {"date": "2027-12-13", "name": "Punam Mahapuja", "type": "Punam Mahapuja", "start": "18:30", "end": "20:30"},
    {"date": "2027-12-18", "name": "Parayan Sabha", "type": "Parayan Sabha", "start": "17:00", "end": "19:00"},
    {"date": "2027-12-23", "name": "Safla Ekadashi", "type": "Ekadashi"}
  ]
};
