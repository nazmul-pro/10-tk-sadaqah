import React, { useEffect } from 'react';
import { Platform, SafeAreaView } from 'react-native';
import { Divider, Layout, Text, TopNavigation } from '@ui-kitten/components';
import { renderBackAction, renderRightActions } from '../core/renderer.component';
import DeviceInfo from 'react-native-device-info';
import '@react-native-firebase/messaging';
import { UserService } from '../services/userService';
import { IUserModel } from '../models/userModel';
import PushNotification from 'react-native-push-notification'; // ' react-native-push-notification';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/messaging';
import { appFirebaseConfig } from '../constants/firebase-config';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

let userInfoData: IUserModel = {
  name: ''
};
export const HomeScreen = ({ navigation }: any) => {

  useEffect(() => {
    firebase.messaging().onMessage(response => {
      console.log('notification');
      console.log(JSON.stringify(response));
      if (Platform.OS !== 'ios') {
        showNotification(response.notification!);
        return;
      }
    });
  }, []);
  const showNotification = (
    notification: FirebaseMessagingTypes.Notification,
  ) => {
    PushNotification.localNotification({
      title: notification.title,
      message: notification.body!,
    });
  };









  //check if exists
  new UserService().userIsExists("users", DeviceInfo.getUniqueId()).then((data) => {
    if (data.data()) {
      userInfoData = data.data() as IUserModel;
      console.log(userInfoData);
      userInfoData.name = "update data checking";

      //update user
      new UserService().updateUser("users", DeviceInfo.getUniqueId(), userInfoData).then((data) => {
        console.log('update sucessfully');
      });
    } else {
      addUser();
    }
  });


  //add user
  const addUser = () => {
    new UserService().addUser("users", DeviceInfo.getUniqueId(), userInfoData).then((data) => {
      console.log('added');
    });
  };


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



