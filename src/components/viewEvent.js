import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import fetchSquareImage from './imagefetchAPI';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import GlobalIconButton from './globalIconButton';

const EventCard = ({ event }) => {
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    async function fetchImage() {
      try {
        const url = await fetchSquareImage(event.title); // Assuming event title is the search query
        setImageURL(url);
      } catch (error) {
        console.error(error);
      }
    }

    fetchImage();
  }, [event.title]);

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageURL }} style={styles.backgroundImage} />
        <View style={styles.trashIconContainer}>
          {/* Circular background behind Trash Icon */}
          <View style={styles.trashIconBackground}>
            <GlobalIconButton
              iconType="trash"
              color="#7D9C65"
              onPressed={() => {
                // Handle trash icon button press event here
                // This function will be executed when the trash icon is pressed
                console.log('Trash icon pressed');
                // Add your logic to delete the event or perform any necessary action
              }}
            />
          </View>
        </View>
        <View style={styles.dateTimeContainer}>
            <FontAwesomeIcon name="calendar" style={styles.dateIcon} />
            <Text style={styles.dateTimeText}>{event.date}</Text>
            <FontAwesomeIcon name="clock-o" style={styles.timeIcon} />
            <Text style={styles.dateTimeText}>{event.time}</Text>
        </View>
        <View style={styles.bottomContent}>
          <ScrollView>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <View style={styles.locationContainer}>
                <FontAwesomeIcon name="map-marker" style={styles.locationIcon} />
                <Text style={styles.locationText}>{event.location}</Text>
            </View>
            <Text style={styles.eventDescription}>{event.description}</Text>
            <View style={styles.joinUsContainer}>
              <Text style={styles.joinUsTitle}>Why you should join us:</Text>
              {/* Render bullet points for reasons */}
              {event.joinReasons.map((reason, index) => (
                <Text key={index} style={styles.bullet}>
                  - {reason}
                </Text>
              ))}
              {/* Attendees button */}
              <TouchableOpacity style={styles.attendeesButton}>
                <Text style={styles.attendeesButtonText}>Attendees</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  imageContainer: {
    width: wp('90%'),
    height: wp('90%') * 2,
    borderRadius: wp('3%'),
    overflow: 'hidden',
    position: 'relative',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bottomContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#7D9C65',
    height: '55%', // Set the height to 55% of the image container
    padding: wp('4%'),
  },
  eventTitle: {
    fontFamily: 'montserrat-bold',
    fontSize: wp('8%'),
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: hp('2%'),
  },
  eventDescription: {
    fontFamily: 'montserrat-regular',
    marginBottom: hp('2%'),
    fontSize: wp('4%'),
    color: '#333333',
  },
  joinUsContainer: {},
  joinUsTitle: {
    fontFamily: 'montserrat-semiBold',
    fontWeight: 'bold',
    marginBottom: hp('1%'),
    fontSize: wp('4%'),
    color: '#333333',
  },
  bullet: {
    fontFamily: 'montserrat-regular',
    color: '#333333',
    fontSize: wp('4%'),
  },
  dateTimeContainer: {
    position: 'absolute',
    bottom: wp('99%'),
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    padding: wp('2%'),
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'left',
    padding: wp('2%'),
  },

  attendeesButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: hp('2%'),
  },
  attendeesButtonText: {
    fontFamily: 'montserrat-bold',
    color: '#7D9C65',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  dateIcon: {
    fontSize: wp('8%'),
    color: '#7D9C65',
  },
  timeIcon: {
    marginLeft: wp('2%'),
    fontSize: wp('8%'),
    color: '#7D9C65',
  },
  locationIcon: {
    fontSize: wp('5%'),
    color: '#Ffffff',
  },
  locationText: {
    fontFamily: 'montserrat-bold',
    fontSize: wp('4%'),
    marginLeft: wp('1%'),
    color: '#Ffffff',
  },
  dateTimeText: {
    fontFamily: 'montserrat-bold',
    fontSize: wp('4%'),
    marginLeft: wp('1%'),
    color: '#7D9C65',
  },
  trashIconContainer: {
    position: 'absolute',
    top: wp('6%'), // Adjust the top position as needed
    right: wp('6%'), // Adjust the right position as needed
  },
  trashIconBackground: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: wp('25%'), // Adjust the radius to make it circular
    width: wp('12%'), // Set the width and height as per the buttonSize
    height: wp('12%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EventCard;
