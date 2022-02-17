import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Card, List, Text, TopNavigation } from '@ui-kitten/components';
import { renderBackAction, renderRightActions } from '../core/renderer.component';
import DeviceInfo from 'react-native-device-info';
import '@react-native-firebase/messaging';
import { UserService } from '../services/userService';
import { IUserModel } from '../models/userModel';
import '@react-native-firebase/messaging';
import { PostService } from '../services/postService';

let userInfoData: IUserModel = {
  name: ''
};

export const HomeScreen = ({ navigation }: any) => {
  const [fetchPostData, postData] = useState<any>(null);
  //notification changes 
  //let postData:any=[];
  // useEffect(() => {
  //   firebase.messaging().onMessage(response => {
  //     console.log('notification');
  //     console.log(JSON.stringify(response));
  //     if (Platform.OS !== 'ios') {
  //       showNotification(response.notification!);
  //       return;
  //     }
  //   });
  // }, []);
  // const showNotification = (
  //   notification: FirebaseMessagingTypes.Notification,
  // ) => {
  //   PushNotification.localNotification({
  //     title: notification.title,
  //     message: notification.body!,
  //   });
  // };

  useEffect(() => {
    new PostService().getPost("post").then((data) => {
      let fetchData = Object.values(data.docs).map(doc => doc.data());
      postData(fetchData);
    }).catch(function(error) {
      _handleError(`There has been a problem with your fetch operation: ${error.message}`);
    });;

    new UserService().userIsExists("users", DeviceInfo.getUniqueId()).then((data) => {
      if (data.data()) {
        userInfoData = data.data() as IUserModel;
        console.log(userInfoData);
      } else {
        addUser();
      }
    });
  });
  
  function _handleError(errorMessage) {
    console.log(errorMessage);
  }
  //add user
  const addUser = () => {
    new UserService().addUser("users", DeviceInfo.getUniqueId(), userInfoData).then((data) => {
      console.log('added');
    });
  };
  //update user 
  const updateUser = () => {
    new UserService().updateUser("users", DeviceInfo.getUniqueId(), userInfoData).then((data) => {
      console.log('update sucessfully');
    });
  };

  const renderItemHeader = (headerProps, info) => (
    <View {...headerProps}>
      <Text category='h6'>
        {info.item.title} {info.index + 1}
      </Text>
    </View>
  );

  const renderItemFooter = (footerProps) => (
    <Text {...footerProps}>
      more details
    </Text>
  );

  const renderItem = (info) => (
    <Card
      style={styles.item}
      status='basic'
      header={headerProps => renderItemHeader(headerProps, info)}
      footer={renderItemFooter}>
      <Text>
        {info.item.description}
      </Text>
    </Card>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        alignment='center'
        title='10 Tk Sadaqah'
        subtitle='Updates'
        accessoryLeft={renderBackAction}
        accessoryRight={renderRightActions}
      />
      <List
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        data={fetchPostData}
        renderItem={renderItem}
      />
    </SafeAreaView>
  )
};
const styles = StyleSheet.create({
  container: {
    maxHeight: 650,
  },
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  item: {
    marginVertical: 4,
  },
});