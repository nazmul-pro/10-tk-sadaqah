import React, { useEffect, useState } from 'react';
import { FlatList, PermissionsAndroid, Platform, SafeAreaView, StyleSheet, TextInput, View } from 'react-native';
import { Divider, Layout, Text, TopNavigation } from '@ui-kitten/components';
import { renderBackAction, renderRightActions } from '../core/renderer.component';
import Contacts from 'react-native-contacts';
import ContactListItem from '../components/contact-list-item.component'

export const ShareScreen = ({ navigation }: any) => {
  const [contacts, setContacts] = useState([]);
  const [inMemContacts, setInMemContacts] = useState([]);

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
      console.log('contacts -> ', contacts);
      // if (err === 'denied') {
      //   alert('Permission to access contacts was denied');
      //   console.warn('Permission to access contacts was denied');
      // } else {
      //   console.log('contacts', contacts);
      // }
    });
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
      </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});