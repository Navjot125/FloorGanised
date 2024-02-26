import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';
import {COLORS} from '../../utils/theme';
import Header from '../../components/Header/Header';

const TermsConditions = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <SafeAreaView />
      <Header title={'Terms & Conditions'} back={true} />
      {/* <View style={styles.container}> */}
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        //   style={styles.container}
      >
        <Text
          style={{
            fontSize: 16,
            color: 'black',
            marginVertical: 10,
            lineHeight: 20,
            fontWeight: 600,
          }}>
          These Terms & Conditions May Change
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: 'black',
            marginVertical: 10,
            lineHeight: 20,
            fontWeight: 400,
          }}>
          Lorem Ipsum is simply dummy text of the printing an and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and a
          scrambled it to make a type specimen book.
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: 'black',
            marginVertical: 10,
            lineHeight: 20,
            fontWeight: 600,
          }}>
          At vero eos et accusamus et iusto odio dignissimos
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: 'black',
            marginVertical: 10,
            lineHeight: 20,
            fontWeight: 400,
          }}>
          Sed ut perspiciatis unde omnis iste natus error sit the voluptatem
          accusantium doloremque laudantium, a totam rem aperiam, eaque ipsa
          quae ab illo inventore veritatis et quasi architecto beatae vitae
          dicta sunt en explicabo. Nemo enim ipsam voluptatem quia ipsam
          voluptas sit aspernatur aut odit aut fugit, sed quia an consequuntur
          magni dolores eos qui ratione ipsam a voluptatem sequi nesciunt.{' '}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: 'black',
            marginVertical: 10,
            lineHeight: 20,
            fontWeight: 600,
          }}>
          Integer ultrices laoreet nunc gravida
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: 'black',
            marginVertical: 10,
            lineHeight: 20,
            fontWeight: 400,
          }}>
          Sed ut perspiciatis unde omnis iste natus error sit the quae
          voluptatem accusantium dolor em que laudan tium, the totam rem
          aperiam, eaque ipsa qua ab illo inventore veritatis et quasi
          architecto beatae vitae an dicta sunt throu explicabo. Nemo enim ipsam
          volupt atem quia voluptas sit aspernatur aut odit aut fugit, sed quia
          consequuntur magni dolores eos qui ration voluptatem sequi dosir
          nesciunt. Sed ut perspiciatis unde omnis iste natus error sit
          voluptatem accusan tium doloremque laudantium, totam rem aperiam,
          eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae
          vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
          sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
          eos qui ratione voluptatem sequi nesciunt.{' '}
        </Text>
      </ScrollView>
    </View>
  );
};

export default TermsConditions;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS?.white,
    borderTopRightRadius: scale(20),
    borderTopLeftRadius: scale(20),
    padding: 20,
    flexGrow: 1,
  },
});
