import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Button, Divider, Layout, Text, TopNavigation } from '@ui-kitten/components';
import { renderBackAction, renderRightActions } from '../core/renderer.component';
import Modal from "react-native-modal";

export const DonateScreen = ({ navigation }: any) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
          alignment='center'
          title='10 Tk Sadaqah'
          subtitle='Donate'
          accessoryLeft={renderBackAction}
          accessoryRight={renderRightActions}
        />
      <Divider/>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
        <Text>Donate for this month</Text>
        <View style={{ flex: 1 }}>
      <Button onPress={toggleModal}>Donate Now</Button>

      <Modal isVisible={isModalVisible} style={styles.modalView}>
        <View style={styles.containerStyle}>
            <View style={styles.content}>
            <Button onPress={toggleModal}>Close</Button>
            </View>
        </View>
      </Modal>
    </View>
      </Layout>
    </SafeAreaView>
  );
};

const styles = {
  modalView: {
    margin: 0,
    justifyContent: 'flex-end'
  },
  containerStyle: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'flex-end'
  },
  content: {
    width: '100%',
    height: '70%',
    backgroundColor: 'white',
    overflow: 'hidden',
  },
}