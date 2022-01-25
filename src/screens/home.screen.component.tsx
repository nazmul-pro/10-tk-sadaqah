import React from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Divider, Layout, Text, TopNavigation } from '@ui-kitten/components';
import { renderBackAction, renderRightActions } from '../core/renderer.component';
import {db} from '../constants/firebase-config';
import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { getDocs } from 'firebase/firestore/lite';

export const HomeScreen = ({ navigation }: any) => {





 

const Geyt=async()=>{
// const city=collection(db,"users");
// const citsnapshot=await getDocs(city);
// const cioo=citsnapshot.docs.map(doc=>doc.data());
// console.log(cioo);
await setDoc(doc(db, "users", "LA"), {
  name: "Los Angeles",
  age: 6
});
}
Geyt();
// app.firestore().
//   setDoc(doc(db, "users", "LA"), {
//     name: "Los Angeles",
//     age: 5
//   }).then(()=>{
//     console.log("succgcg");
//   });
  //firebase.firestore().collection('users');
  // var result = firebase.firestore().collection('users');
  // console.log(result);
  const navigateDetails = () => {
    navigation.navigate('Details');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        alignment='center'
        title='10 Tk Sadaqah'
        subtitle='Updates'
        accessoryLeft={renderBackAction}
        accessoryRight={renderRightActions}
      />
      <Divider />
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* <Button onPress={navigateDetails}>OPEN DETAILS</Button> */}
        <Text>Latest news shown here</Text>
      </Layout>
    </SafeAreaView>
  );
};