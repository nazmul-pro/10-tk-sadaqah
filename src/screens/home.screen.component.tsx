import React from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Divider, Layout, Text, TopNavigation } from '@ui-kitten/components';
import { renderBackAction, renderRightActions } from '../core/renderer.component';

export const HomeScreen = ({ navigation }: any) => {

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
      <Divider/>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* <Button onPress={navigateDetails}>OPEN DETAILS</Button> */}
        <Text>Latest news shown here</Text>
      </Layout>
    </SafeAreaView>
  );
};