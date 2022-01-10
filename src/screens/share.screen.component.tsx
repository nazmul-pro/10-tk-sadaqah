import React from 'react';
import { SafeAreaView } from 'react-native';
import { Divider, Layout, Text, TopNavigation } from '@ui-kitten/components';
import { renderBackAction, renderRightActions } from '../core/renderer.component';

export const ShareScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        alignment='center'
        title='10 Tk Sadaqah'
        subtitle='Share'
        accessoryLeft={renderBackAction}
        accessoryRight={renderRightActions}
      />
      <Divider/>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Share this app with friends</Text>
      </Layout>
    </SafeAreaView>
  );
};