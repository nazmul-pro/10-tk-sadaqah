import React, { useState } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { Button, Divider, Icon, Input, Layout, Radio, Select, SelectItem, Text, TopNavigation } from '@ui-kitten/components';
import { renderBackAction, renderRightActions } from '../../core/renderer.component';
import Modal from "react-native-modal";

export const DonateScreen = ({ navigation }: any) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [showHowToPay, setShowHowToPay] = useState(false);
  const [amount, setAmount] = useState('');
  const [number, setNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bKash');
  const months = [
    { id: 1, name: 'জানুয়ারি' }, { id: 2, name: 'ফেব্রুয়ারি' }, { id: 3, name: 'মার্চ' }, { id: 4, name: 'এপ্রিল' },
    { id: 5, name: 'মে' }, { id: 6, name: 'জুন' }, { id: 7, name: 'জুলাই' }, { id: 8, name: 'আগস্ট' },
    { id: 9, name: 'সেপ্টেম্বর' }, { id: 10, name: 'অক্টোবর' }, { id: 11, name: 'নভেম্বর' }, { id: 12, name: 'ডিসেম্বর' },
  ]
  const [selectedMonth, setSelectedMonth] = useState(months[0]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const selectMonth = (m) => {
    console.log(m);

    setSelectedMonth(m);
    toggleModal();
  }

  const toggleHowToModal = () => {
    setShowHowToPay(!showHowToPay);
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
      <Divider />
      <Text style={{ textAlign: 'center', fontSize: 20, padding: 5, fontWeight: 'bold', color: 'green' }}>মাস নির্বাচন করুন</Text>
      <Text style={{ textAlign: 'center', fontSize: 16, padding: 5, fontWeight: 'bold' }}>২০২২ সাল</Text>
      <Layout style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {
          months.map(m => (
            <><TouchableOpacity
              style={{ width: '30%', margin: 5 }}
              activeOpacity={0.7} key={m.id}
              onPress={index => selectMonth(m)}
            >
              <Text key={m.id} style={[styles.month, m.id !== 1 ? styles.paidMonth : '']}>
                {m.name}
              </Text>
            </TouchableOpacity>
            </>
          ))
        }
      </Layout>
      <Layout style={{ alignItems: 'center', flexDirection: 'column' }}>

        <Button style={styles.donateBtn} onPress={toggleModal}>Donate Now</Button>
        <Button style={styles.howBtn} onPress={toggleHowToModal}>How to Pay?</Button>
      </Layout>
      <View style={{ flex: 1 }}>

        <Modal isVisible={isModalVisible} style={styles.modalView}>
          <View style={styles.containerStyle}>
            <View style={styles.content}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={toggleModal}>
                <Text style={{ textAlign: 'right' }}>
                  <Icon
                    style={{ width: 28, height: 28, }}
                    fill='#8F9BB3'
                    name='close'
                  />
                </Text>

              </TouchableOpacity>

              <View style={{ position: 'relative', top: -30, zIndex: -1 }}>

                <Text style={{ fontSize: 16, color: 'green', paddingBottom: 20, textAlign: 'center' }}>দানের সাধারন তথ্য</Text>
                <Layout style={{ alignItems: 'center', flexDirection: 'column' }}>
                    <Text style={[styles.month, selectedMonth?.id !== 1 ? styles.paidMonth : '', styles.donatePageMonth]}>
                      {selectedMonth?.name}
                    </Text>
                </Layout>
                <Layout>
                  <Input style={{ paddingBottom: 10 }}
                    value={amount}
                    label='টাকার পরিমান'
                    placeholder='টাকার পরিমান'
                    onChangeText={amount => setAmount(amount)}
                  />
                  <Input style={{ paddingBottom: 10 }}
                    value={number}
                    label='ফোন নাম্বার (যদি দিতে চান)'
                    placeholder='নাম্বার অথবা শেষের ৪ ডিজিট'
                    onChangeText={num => setNumber(num)}
                  />
                  <Text style={{ fontSize: 12, color: '#8389a3', paddingBottom: 5 }}>পেমেন্ট মাধ্যম</Text>
                  <Layout style={{ flexDirection: 'row' }} level='1'>

                    <Radio
                      style={styles.radio}
                      checked={paymentMethod === 'bKash'}
                      onChange={nextChecked => setPaymentMethod('bKash')}
                    >
                      বিকাশ
                    </Radio>
                    <Radio
                      style={styles.radio}
                      checked={paymentMethod === 'rocket'}
                      onChange={nextChecked => setPaymentMethod('rocket')}
                    >
                      রকেট
                    </Radio>
                    <Radio
                      style={styles.radio}
                      checked={paymentMethod === 'others'}
                      onChange={nextChecked => setPaymentMethod('others')}
                    >
                      অন্যান্য
                    </Radio>

                  </Layout>
                </Layout>
                <Layout style={{ alignItems: 'center', flexDirection: 'column', paddingTop: 20 }}>
                  <Button style={styles.donateBtn} onPress={toggleModal}>Save</Button>
                </Layout>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <View style={{ flex: 1 }}>

        <Modal isVisible={showHowToPay} style={styles.modalView}>
          <View style={styles.containerStyle}>
            <View style={styles.content}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={toggleHowToModal}>
                <Text style={{ textAlign: 'right' }}>
                  <Icon
                    style={{ width: 28, height: 28, }}
                    fill='#8F9BB3'
                    name='close'
                  />
                </Text>

              </TouchableOpacity>

              <View style={{ position: 'relative', top: -30, zIndex: -1 }}>

                <Text style={{ fontSize: 16, color: 'green', paddingBottom: 20, textAlign: 'center' }}>যেভাবে টাকা পাঠাবেন!</Text>

              </View>
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
    padding: 20
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
  donatePageMonth: {
    maxWidth: 120,
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
  },
  radio: {
    marginRight: 10
  }
}