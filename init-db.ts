
import {COURSES, findLessonsForCourse} from './db-data';

import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDBxzoj0MIudTlYA9dV8_cQZANwmp2gEJI",
  authDomain: "raj-test1-firebase.firebaseapp.com",
  databaseURL: "https://raj-test1-firebase.firebaseio.com",
  projectId: "raj-test1-firebase",
  storageBucket: "raj-test1-firebase.appspot.com",
  messagingSenderId: "906831984418",
  appId: "1:906831984418:web:47fbcf84067cd043d3977b"
};

console.log("Uploading data to the database with the following config:\n");

console.log(JSON.stringify(config));

console.log("\n\n\n\nMake sure that this is your own database, so that you have write access to it.\n\n\n");

const app = firebase.initializeApp(config);
const db = firebase.firestore();

main().then(r => console.log('Done.'));

async function uploadData() {
  const courses = await db.collection('courses');
  for (let course of Object.values(COURSES)) {
    const newCourse = removeId(course);
    const courseRef = await courses.add(newCourse);
    const lessons = await courseRef.collection('lessons');
    const courseLessons = findLessonsForCourse(course['id']);
    console.log(`Uploading course ${course['titles']["description"]}`);
    for (const lesson of courseLessons) {
      const newLesson = removeId(lesson);
      await lessons.add(newLesson);
    }
  }
}

function removeId(data: any) {
  const newData: any = {...data};
  delete newData.id;
  return newData;
}

async function main(){
  try {
    console.log('Start main...\n\n');
    await uploadData();
    console.log('\n\nClosing Application...');
    await app.delete();
  } catch (e) {
    console.log('Data upload failed, reason:', e, '\n\n');
  }
}

