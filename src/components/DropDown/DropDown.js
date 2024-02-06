import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { scale } from 'react-native-size-matters';
import { COLORS } from '../../utils/theme';
import SelectDropdown from 'react-native-select-dropdown';

const DropDown = ({data, setLicencseLevel, defaultButtonText, handleChangeSecondScreen}) => {
  return (
    <View style={{marginBottom:25}} >
      <SelectDropdown
          data={data}
          // defaultValue={user?.licencseLevel}
          onSelect={(selectedItem, index) => {
            // console.log(selectedItem, index)
            setLicencseLevel(selectedItem);
            handleChangeSecondScreen()
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          defaultButtonText={defaultButtonText}
          buttonStyle={styles.buttonStyle}
          buttonTextStyle={styles.buttonTextStyle}
          dropdownStyle={styles.dropdownStyle}
          selectedRowTextStyle={{color: COLORS.primary}}
          dropdownOverlayColor="transparent"
          rowTextStyle={styles.rowTextStyle}
          rowStyle={{borderBottomColor: null, borderBottomWidth: null}}
          renderDropdownIcon={() => {
            return (
              <AntDesign
                style={{marginRight: 10}}
                name="caretdown"
                color={COLORS.black}
                size={12}
              />
            );
          }}
          dropdownIconPosition="right"
        />
    </View>
  )
}

export default DropDown

const styles = StyleSheet.create({

  buttonStyle: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.brgrey,
    borderRadius: 40,
    height: 60,
  },
  buttonTextStyle: {
    textAlign: 'left',
    color: COLORS.black,
    fontSize: scale(14),
    paddingLeft: 15,
    //   fontFamily: FONTS.PoppinsRegular
    fontWeight: 400,
  },
  dropdownStyle: {
    marginTop: -10,
    borderRadius: 16,
    borderTopWidth: 1,
    borderWidth: 1,
    borderColor: COLORS.brgrey,
    backgroundColor: COLORS.white,
  },
  rowTextStyle: {
    //   fontFamily: FONTS.PoppinsMedium,
    textAlign: 'left',
    marginBottom: 0,
    paddingHorizontal: 15,
    color: COLORS.black,
    fontSize: scale(12),
  },
})