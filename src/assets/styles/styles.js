import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {fontValue} from '../../utils/responsiveFont';

export const {height, width} = Dimensions.get('window');

export const linearGradientSettings = {
  colors: [
    'rgba(69, 92, 100, 0.81)',
    'rgba(69, 92, 100, 0.21)',
    'rgba(69, 92, 100, 0.81)',
  ],
  start: {x: 4, y: 1},
  end: {x: 3.45, y: 0},
};
export const detailsLinearGradientSettings = {
  start: {x: 2.5, y: 8},
  end: {x: 0, y: -8},
};
export const styles = StyleSheet.create({
  // spaces
  container: {
    paddingHorizontal: 20,
    flex: 1,
    //  width: '100%',/
  },
  flex1: {
    flex: 1,
  },
  flexGrow1: {
    flexGrow: 1,
  },
  w100: {
    width: '100%',
  },
  w95: {
    width: '95%',
  },
  w50: {
    width: '50%',
  },
  // layout
  screenCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenBottomRight: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  alSelfCenter: {
    alignSelf: 'center',
  },
  alSelfStart: {
    alignSelf: 'flex-start',
  },
  fdr: {
    flexDirection: 'row',
  },
  posAbs: {
    position: 'absolute',
    zIndex: 999,
  },
  // backgrounds
  bgBlack: {
    backgroundColor: '#000000',
  },
  bgWhite: {
    backgroundColor: '#fff',
  },
  bgMaroon: {
    backgroundColor: '#8B0000',
  },
  bgWhite1Opacity: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  bgWhite08Opacity: {
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  bgWhite06Opacity: {
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  // margin
  mt5: {
    marginTop: '5%',
  },
  mt7: {
    marginTop: '7%',
  },
  mt10: {
    marginTop: '10%',
  },
  mt15: {
    marginTop: '15%',
  },
  mb5: {
    marginBottom: '5%',
  },
  mb10: {
    marginBottom: '10%',
  },
  mr8: {
    marginRight: '8%',
  },
  mr10: {
    marginRight: '10%',
  },
  // font styles
  textWhite: {
    color: '#fff',
  },
  textUnderline: {
    textDecorationLine: 'underline',
  },
  textCenter: {
    textAlign: 'center',
  },
  textAlignTop: {
    textAlignVertical: 'top',
  },
  lineHeight11: {
    lineHeight: 11,
  },
  lineHeight12: {
    lineHeight: 12,
  },
  lineHeight18: {
    lineHeight: 18,
  },
  lineHeight28: {
    lineHeight: 28,
  },
  // font sizes
  fw700: {
    //  fontWeight: 'bold',
    fontFamily: 'FiraSans-Bold',
  },
  fs8: {
    fontSize: fontValue(8),
  },
  fs9: {
    fontSize: fontValue(9),
  },
  fs10: {
    fontSize: fontValue(10),
  },
  fs12: {
    fontSize: fontValue(12),
  },
  fs14: {
    fontSize: fontValue(14),
  },
  fs15: {
    fontSize: fontValue(15),
  },
  fs16: {
    fontSize: fontValue(16),
  },
  fs20: {
    fontSize: fontValue(20),
  },
  fs23: {
    fontSize: fontValue(23),
  },
  fs24: {
    fontSize: fontValue(24),
  },
  // padding
  pv5: {
    paddingVertical: '5%',
  },
  pv10: {
    paddingVertical: '10%',
  },
  pv15: {
    paddingVertical: '15%',
  },
  pv10px: {
    paddingVertical: 10,
  },
  pv15px: {
    paddingVertical: 15,
  },
  ph5: {
    paddingHorizontal: '5%',
  },
  ph10px: {
    paddingHorizontal: 10,
  },
  ph15px: {
    paddingHorizontal: 15,
  },
  ph20px: {
    paddingHorizontal: 20,
  },
  pr18px: {
    paddingRight: 18,
  },
  pl5: {
    paddingLeft: '5%',
  },
  pl15px: {
    paddingLeft: 15,
  },
  pl20px: {
    paddingLeft: 20,
  },
  ml5px: {
    marginLeft: 5,
  },
  pt5: {
    paddingTop: '5%',
  },
  pt10: {
    paddingTop: '10%',
  },
  // border
  borderGrey: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  borderRad5: {
    borderRadius: 5,
  },
  borderRad8: {
    borderRadius: 8,
  },
  borderRad9: {
    borderRadius: 9,
  },
  borderRad10: {
    borderRadius: 10,
  },
  borderRad16: {
    borderRadius: 16,
  },
  borderRad20: {
    borderRadius: 20,
  },
  borderRad40: {
    borderRadius: 40,
  },
  borderRad50: {
    borderRadius: 50,
  },
  whiteShadow: {
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,

    elevation: 15,
  },
  black05Shadow: {
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 15,

    elevation: 15,
  },
  maroonShadow: {
    shadowColor: '#8B0000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 15,
  },
  iconBtn: {height: 45, width: 45, borderRadius: 45},
  iconBtnLg: {height: 55, width: 55, borderRadius: 55},
  // colors
  maroon: {
    color: '#8B0000',
  },

  // sections

  authBgPlacement: {
    position: 'absolute',
    bottom: 0,
    right: width * 0.01,
  },
  h15: {
    height: '15%',
  },
  h80: {
    height: '80%',
  },
  h100: {
    height: '100%',
  },
  w26: {
    width: '26%',
  },
  w40: {
    width: '40%',
  },
  errorText: {
    color: 'red',
    textAlign: 'left',
  },
});
