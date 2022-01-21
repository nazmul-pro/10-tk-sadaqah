import React, { useState } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { Button, Divider, Layout, Text, TopNavigation } from '@ui-kitten/components';
import { renderBackAction, renderRightActions } from '../../core/renderer.component';
import Modal from "react-native-modal";

export const DonateScreen = ({ navigation }: any) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const months = [
    {id: 1, name: 'জানুয়ারি'}, {id: 2, name: 'ফেব্রুয়ারি'}, {id: 3, name: 'মার্চ'}, {id: 4, name: 'এপ্রিল'},
    {id: 5, name: 'মে'}, {id: 6, name: 'জুন'}, {id: 7, name: 'জুলাই'}, {id: 8, name: 'আগস্ট'},
    {id: 9, name: 'সেপ্টেম্বর'}, {id: 10, name: 'অক্টোবর'}, {id: 11, name: 'নভেম্বর'}, {id: 12, name: 'ডিসেম্বর'},
  ]

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <TopNavigation
          alignment='center'
          title='10 Tk Sadaqah'
          subtitle='Donate'
          accessoryLeft={renderBackAction}
          accessoryRight={renderRightActions}
        />
      <Divider/>
        <Text style={{ textAlign: 'center', fontSize: 20, padding: 5, fontWeight: 'bold', color: 'green'}}>মাস নির্বাচন করুন</Text>
        <Text style={{ textAlign: 'center', fontSize: 16, padding: 5, fontWeight: 'bold'}}>২০২২ সাল</Text>
      <Layout style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {
            months.map(m => (
              <><TouchableOpacity
                style={{width: '30%', margin: 5}}
                activeOpacity={0.7}
                onPress={toggleModal}
                >
                <Text style={[styles.month, m.id !== 1 ? styles.paidMonth: '']}>
                  {m.name}
                </Text>
              </TouchableOpacity>
              </>
            ))
          }
      </Layout>
      <Layout style={{ alignItems: 'center', flexDirection: 'column'}}>

          <Button style={styles.donateBtn} onPress={toggleModal}>Donate Now</Button>
          <Button style={styles.howBtn} onPress={toggleModal}>How to Pay?</Button>
      </Layout>
        <View style={{ flex: 1 }}>

          <Modal isVisible={isModalVisible} style={styles.modalView}>
            <View style={styles.containerStyle}>
                <View style={styles.content}>
                <Button onPress={toggleModal}>Close</Button>
                </View>
            </View>
          </Modal>
        </View>
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
  month: {
    textAlign: 'center',
    width: 'auto',
    height: 40,
    padding: 10,
    borderRadius: 30,
    color: '#fff',
    backgroundColor: '#55a95e'
  },
  paidMonth: {
    backgroundColor: '#edf1f7',
    color: 'black'
  },
  donateBtn: {
    width: '60%',
    borderRadius: 30,
    marginTop: 30,
    textAlign: 'center',
    backgroundColor: '#55a95e',
    borderWidth: 0
  },
  howBtn: {    
    width: '60%',
    borderRadius: 30,
    textAlign: 'center',
    marginTop: 20,
    borderWidth: 0
  }
}