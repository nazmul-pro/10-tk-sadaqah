import { CheckBox } from '@ui-kitten/components';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedContacts } from '../screens/share/share.slice';
import Avatar from './contact-avatar.component';

const ContactListItem = ({contact}: any) => {
  const getAvatarInitials = (textString: string) => {
    if (!textString) return '';
    const text = textString.trim();
    const textSplit = text.split(' ');
    if (textSplit.length <= 1) return text.charAt(0);
    const initials =
      textSplit[0].charAt(0) + textSplit[textSplit.length - 1].charAt(0);
    return initials;
  };
  
  const [allChecked, setAllChecked] = React.useState(false);
  const [indeterminate, setIndeterminate] = React.useState(false);
  const [readChecked, setReadChecked] = React.useState(false);
  const [writeChecked, setWriteChecked] = React.useState(false);
  
  const dispatch = useDispatch()
  const share = useSelector((state) => state.share);

  const onGroupCheckedChange = (checked) => {
    setReadChecked(checked);
    setWriteChecked(checked);
    setAllChecked(checked);
    updateGroup(checked, checked);
  };

  const onReadCheckedChange = (checked) => {
    setReadChecked(checked);
    updateGroup(checked, writeChecked);
  };

  const onWriteCheckedChange = (checked) => {
    setWriteChecked(checked);
    updateGroup(checked, readChecked);
  };

  const updateGroup = (...states) => {
    const someChecked = states.some((item) => item === true);
    const everyChecked = states.every((item) => item === true);

    if (someChecked && !everyChecked) {
      setAllChecked(true);
      setIndeterminate(true);
    } else if (!someChecked && !everyChecked) {
      setAllChecked(false);
      setIndeterminate(false);
    } else if (everyChecked) {
      setAllChecked(true);
      setIndeterminate(false);
    }
  };

  const toggleSelect = () => {
    console.log('toggle');
    
    dispatch(setSelectedContacts(contact));
    setReadChecked(!readChecked);
  }
  return (
    <TouchableNativeFeedback onPress={toggleSelect}> 
      <View style={styles.contactCon}>
        <View>
              <Avatar
                img={
                  contact?.hasThumbnail ?
                    {uri: contact?.thumbnailPath} : undefined
                }
                placeholder={getAvatarInitials(
                  `${contact?.givenName} ${contact?.familyName}`,
                )}
                width={50}
                height={50}
              />
            </View>
        <View style={styles.contactDat}>
          <Text style={styles.name}>
            {contact?.givenName} {contact?.middleName && contact.middleName + ' '}
            {contact?.familyName}
          </Text>
          <Text style={styles.phoneNumber}>
            {contact?.phoneNumbers[0]?.number}
          </Text>
        </View>
        <CheckBox
          style={styles.option}
          status={'success'}
          checked={readChecked}
          onChange={onReadCheckedChange}>        
        </CheckBox>
      </View>
    </TouchableNativeFeedback>

  );
};
const styles = StyleSheet.create({
  leftElementContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
    paddingLeft: 13,
  },
  contactCon: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#d9d9d9',
  },
  imgCon: {},
  placeholder: {
    width: 55,
    height: 55,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#d9d9d9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactDat: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 15,
  },
  txt: {
    fontSize: 18,
  },
  name: {
    fontSize: 16,
  },
  phoneNumber: {
    color: '#888',
  },
  option: {
    marginVertical: 4,
    marginHorizontal: 12,
  },
});
export default ContactListItem;