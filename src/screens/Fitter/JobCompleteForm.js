import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {scale} from 'react-native-size-matters';
import {COLORS} from '../../utils/theme';
import Header from '../../components/Header/Header';
// import {Checkbox} from 'react-native-paper';
import {JobCompleteFormData, jobForm} from '../../config/DummyData';
import CheckBox from '@react-native-community/checkbox';
import {Checkbox} from 'react-native-paper';

const JobCompleteForm = () => {
  const [selectedItems, setSelectedItems] = useState(jobForm);
  const toggleTaskCompletion = name => {
    setSelectedItems(prevTasks =>
      prevTasks?.map(task =>
        task.title === name
          ? task?.status === 'pending'
            ? {...task, status: 'completed'}
            : {...task, status: 'pending'}
          : task,
      ),
    );
  };

  const TypeDropDown = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          //   backgroundColor: 'yellow',
          width: '90%',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 12, fontWeight: 600}}>
          {Object.keys(jobForm)[index]}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: 400,
            width: 70,
            textAlign: 'right',
          }}>
          {item?.value}
        </Text>
      </View>
    );
  };
  const TypeDescription = ({item, index}) => {
    return (
      <View
        style={{
          //   flexDirection: 'row',
          //   justifyContent: 'space-between',
          padding: 10,
          //   backgroundColor: 'yellow',
          width: '90%',
          //   alignItems: 'center',
        }}>
        <Text style={{fontSize: 12, fontWeight: 600}}>
          {Object.keys(jobForm)[index]}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: 400,
            top: 10,
            // width: 70,
            // textAlign: 'right',
          }}>
          {item?.description}
        </Text>
      </View>
    );
  };
  const TypeImages = ({item, index}) => {
    return (
      <View
        style={{
          padding: 10,
          width: '90%',
        }}>
        <Text style={{fontSize: 12, fontWeight: 600}}>
          {Object.keys(jobForm)[index]}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <Image
            source={item?.image1}
            style={{height: 56, width: 90, borderRadius: 16}}
          />
          <Image
            source={item?.image1}
            style={{height: 56, width: 90, borderRadius: 16}}
          />
          <Image
            source={item?.image1}
            style={{height: 56, width: 90, borderRadius: 16}}
          />
        </View>
        <Text
          style={{
            fontSize: 12,
            fontWeight: 400,
            top: 10,
            // width: 70,
            // textAlign: 'right',
          }}>
          {item?.description}
        </Text>
      </View>
    );
  };
  const toggleStatus = key => {
    setSelectedItems(prevData => {
      const updatedData = {...prevData};
      const currentItem = updatedData[key];
      currentItem.status =
        currentItem.status === 'pending' ? 'complete' : 'pending';
      return updatedData;
    });
  };
  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 5,
        }}>
        {item?.status == 'pending' ? (
          <TouchableOpacity
            style={{height: 20, width: 20}}
            onPress={() => toggleStatus(Object.keys(selectedItems)[index])}>
            <Image
              style={{height: 20, width: 20}}
              source={require('../../assets/images/unchecked.png')}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{height: 20, width: 20}}
            onPress={() => toggleStatus(Object.keys(selectedItems)[index])}>
            <Image
              style={{height: 20, width: 20}}
              source={require('../../assets/images/checked.png')}
            />
          </TouchableOpacity>
        )}
        {item?.type === 'DropDown' ? (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* {item?.status == 'pending' ? (
              <TouchableOpacity
                style={{height: 20, width: 20}}
                onPress={() => toggleStatus(Object.keys(selectedItems)[index])}>
                <Image
                  style={{height: 20, width: 20}}
                  source={require('../../assets/images/unchecked.png')}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{height: 20, width: 20}}
                onPress={() => toggleStatus(Object.keys(selectedItems)[index])}>
                <Image
                  style={{height: 20, width: 20}}
                  source={require('../../assets/images/checked.png')}
                />
              </TouchableOpacity>
            )} */}
            <TypeDropDown item={item} index={index} />
          </View>
        ) : item?.type === 'Description' ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              //   backgroundColor: 'red',
            }}>
            {/* {item?.status == 'pending' ? (
              <TouchableOpacity
                style={{height: 20, width: 20}}
                onPress={() => toggleStatus(Object.keys(selectedItems)[index])}>
                <Image
                  style={{height: 20, width: 20}}
                  source={require('../../assets/images/unchecked.png')}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{height: 20, width: 20}}
                onPress={() => toggleStatus(Object.keys(selectedItems)[index])}>
                <Image
                  style={{height: 20, width: 20}}
                  source={require('../../assets/images/checked.png')}
                />
              </TouchableOpacity>
            )} */}
            <TypeDescription item={item} index={index} />
          </View>
        ) : item?.type === 'Images' ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {/* {item?.status == 'pending' ? (
              <TouchableOpacity
                style={{height: 20, width: 20}}
                onPress={() => toggleStatus(Object.keys(selectedItems)[index])}>
                <Image
                  style={{height: 20, width: 20}}
                  source={require('../../assets/images/unchecked.png')}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{height: 20, width: 20}}
                onPress={() => toggleStatus(Object.keys(selectedItems)[index])}>
                <Image
                  style={{height: 20, width: 20}}
                  source={require('../../assets/images/checked.png')}
                />
              </TouchableOpacity>
            )} */}
            <TypeImages item={item} index={index} />
          </View>
        ) : null}
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <SafeAreaView />
      <Header title={'Job Complete Form'} back={true} />
      <View style={styles.container}>
        <FlatList
          data={Object.values(selectedItems)}
          keyExtractor={item => item._id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default JobCompleteForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS?.white,
    flex: 1,
    borderTopRightRadius: scale(20),
    borderTopLeftRadius: scale(20),
    padding: 20,
    justifyContent: 'space-between',
  },
});
