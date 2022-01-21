import React, { useEffect, useState } from 'react';
import { FlatList, Image, PermissionsAndroid, Platform, SafeAreaView, Share, StyleSheet, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { Button, Divider, Icon, Input, Layout, Text, TopNavigation } from '@ui-kitten/components';
import { renderBackAction, renderRightActions } from '../../core/renderer.component';
import Contacts from 'react-native-contacts';
import ContactListItem from '../../components/contact-list-item.component'
import { useSelector } from 'react-redux';
import Modal from "react-native-modal";
import SendSMS from 'react-native-sms';

export const ShareScreen = ({ navigation }: any) => {
  const [contacts, setContacts] = useState([]);
  const [inMemContacts, setInMemContacts] = useState([]);
  const share = useSelector(state => state.share);
  const [isModalVisible, setModalVisible] = useState(false);
  const [msg, setMsg] = useState(`Monthly 10tk sadaqah group a join korun. 
  Group a join korun
  app install korun`);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  
  const msgFromPhone = () => {
    if (share.length < 1) {
      ToastAndroid.show("A pikachu appeared nearby !", ToastAndroid.SHORT);      
      return;
    }

    SendSMS.send(
      {
        // Message body
        body: msg,
        // Recipients Number
        recipients: share.map(c => c?.phoneNumbers[0]?.number).filter(c => !!c),
        // An array of types 
        // "completed" response when using android
        successTypes: ['sent', 'queued'],
      },
      (completed, cancelled, error) => {
        if (completed) {
          console.log('SMS Sent Completed');
        } else if (cancelled) {
          console.log('SMS Sent Cancelled');
        } else if (error) {
          console.log('Some error occured');
        }
      },
    );
  }
  
  const msgfromApp = () => {
    ToastAndroid.show("An group admin will send this sms to the selected numbers", ToastAndroid.LONG);      

  }
  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
          title: 'Contacts',
          message: 'This app would like to view your contacts.',
        }).then(() => {
          loadContacts();
        }
      );
    } else {
      loadContacts();
    }
  }, []);

  const loadContacts = () => {
    Contacts.getAll().then((contacts) => {
      contacts.sort(
        (a, b) => 
          a.givenName.toLowerCase() > b.givenName.toLowerCase(),
      );
      setContacts(contacts);
      setInMemContacts(contacts);
      handleSumbit()
      // console.log('contacts -> ', contacts);
      // if (err === 'denied') {
      //   alert('Permission to access contacts was denied');
      //   console.warn('Permission to access contacts was denied');
      // } else {
      //   console.log('contacts', contacts);
      // }
    }).catch(err=>err);
  };
  const keyExtractor = (item, idx) => {
    return item?.recordID?.toString() || idx.toString();
  };
  const renderItem = ({item, index}) => {
    return <ContactListItem contact={item} />;
  };

  const searchContacts = srcText => {
    const filteredContacts = inMemContacts.filter(contact => {
      let contactLowercase = (
        contact.givenName +
        ' ' +
        contact.familyName +
        ' ' + 
        contact?.phoneNumbers[0]?.number + '' + contact?.phoneNumbers[1]?.number
      ).toLowerCase();

      let searchTermLowercase = srcText.toLowerCase();

      return contactLowercase.indexOf(searchTermLowercase) > -1;
    });
    setContacts(filteredContacts);
  };
  
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
      
      <Modal isVisible={isModalVisible} style={styles.modalView}>
        <View style={styles.containerStyle}>
              <View style={styles.content}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={toggleModal}>
                  <Text style={{ textAlign: 'right'}}>
                    <Icon
                      style={{width: 28, height: 28,}}
                      fill='#8F9BB3'
                      name='close'
                    />
                  </Text>

              </TouchableOpacity>
              <View style={{position:'relative', top: -30, zIndex: -1}}>

                  <Text style={{fontSize:16,color: 'green', paddingBottom: 20, textAlign: 'center' }}>Share with {share.length} people</Text>
                  <Input
                    style={{minHeight: 70, height: 'auto' }}
                    multiline={true}
                    value={msg}
                    label='Message'
                    placeholder='Place your Text'
                    caption={`${msg.length} characters`}
                    onChangeText={nextValue => setMsg(nextValue)}
                  />  
                <Button style={{marginTop: 10, backgroundColor: 'blue'}} onPress={msgFromPhone}>Msg from my phone(Charge)</Button>
                <Button style={{marginTop: 10, backgroundColor: 'green'}} onPress={msgfromApp}>Msg from app(Free)</Button>
                
              </View>
            </View>
        </View>
      </Modal>
      <View style={styles.container}>
        <TextInput
          onChangeText={searchContacts}
          placeholder="Search"
          style={styles.searchBar}
        />
        <FlatList
          data={contacts}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          style={styles.list}
        />
        {
          share.length > 0 &&          
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={toggleModal}
            style={styles.touchableOpacityStyle}>
              <Text style={styles.shareButton}>
                Share with {share.length} {share.length > 1 ? 'people' : 'person'}
              </Text>
          </TouchableOpacity>
        }
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    padding: 20,
    width: '100%',
    height: '70%',
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#4591ed',
    color: 'white',
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 20,
  },
  searchBar: {
    backgroundColor: '#f0eded',
    paddingHorizontal: 30,
    paddingVertical: Platform.OS === 'android' ? undefined : 15,
  },
  touchableOpacityStyle: {
    position: 'absolute',
    textAlign: 'center',
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    // right: 'auto',
    bottom: 25,
  },
  shareButton: {
    textAlign: 'center',
    width: 'auto',
    height: 40,
    padding: 10,
    borderRadius: 30,
    color: '#fff',
    backgroundColor: 'green'
  },
});