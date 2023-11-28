import { useState } from "react";
import { Image } from "react-native";
import {
  Calendar,
  LocaleConfig,
  CalendarProvider,
  ExpandableCalendar,
} from "react-native-calendars";
import { globalStyles } from "../styles/globalStyles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

LocaleConfig.locales["en"] = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthNamesShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  dayNamesShort: ["Sun", "M", "T", "W", "Th", "F", "Sat"],
};

LocaleConfig.defaultLocale = "en";

export default function CalendarComponent({ events, onDayPress }) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const minDate = `${currentYear}-01-01`;
  const maxDate = `${currentYear}-12-31`;

  const [selected, setSelected] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  // console.log("events", events);
  // if (Array.isArray(events)) {
  //   events.map((event) => {
  //     const date = event.datetime.split("T")[0];
  //     console.log("Event date: ", date);
  //   });
  // } else {
  //   console.log("events is not an array");
  // }

  let markedDates = {};

  // need to use forEach instead of map because map returns a new array
  const colors = [
    "#61040F", // dark red
    "#f75b00", // orange color
    "#341761", // dark violet
    "#126123", // light dark green
    "#73E01F", // neon green
    "#1F3D09", // medyo dark green
    "#498F14", // medyo medyo dark green
  ];

  if (Array.isArray(events)) {
    events.forEach((event, index) => {
      const date = event.datetime.split("T")[0];
      const color = colors[index % colors.length];
      const eventMarking = {
        key: event.id,
        color: color,
        selectedDotColor: color,
      };

      if (markedDates[date]) {
        markedDates[date].dots.push(eventMarking);
      } else {
        markedDates[date] = {
          dots: [eventMarking],
          selected: true,
          selectedColor: "transparent",
          selectedTextColor: globalStyles.colors.darkGreen,
          activeOpacity: 0,
        };
      }
    });
  } else {
    console.log("events is not an array");
  }

  const handleDayPress = (day) => {
    setSelected(day.dateString);
    onDayPress(day.dateString);
  };

  return (
    <CalendarProvider>
      {/* <ExpandableCalendar/> */}
      <Calendar
        current={currentDate.toISOString().split("T")[0]}
        minDate={minDate}
        maxDate={maxDate}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={(day) => {
          console.log("selected day", day);
          setSelected(day.dateString);
          handleDayPress(day);
        }}
        enableSwipeMonths={true}
        // markedDates={events}
        markingType={"multi-dot"}
        markedDates={{
          ...markedDates,
          [selected]: {
            selected: true,
            selectedColor: globalStyles.colors.darkGreen,
          },
          [currentDate.toISOString().split("T")[0]]: {
            customStyles: {
              container: {
                backgroundColor: globalStyles.colors.darkGreen,
              },
              text: {
                color: "white",
              },
            },
          },
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={"MMMM yyyy"}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={(month) => {
          console.log("month changed", month);
        }}
        // Hide month navigation arrows. Default = false
        // hideArrows={true}
        // Replace default arrows with custom ones (direction can be 'left' or 'right')
        renderArrow={(direction) => (
          <Image
            source={require("../../assets/double-arrow-left.png")}
            style={{
              width: hp("1.5%"),
              height: hp("1.5%"),
              transform: direction === "right" ? [{ rotate: "180deg" }] : [],
            }}
          />
        )}
        // Do not show days of other months in month page. Default = false
        // hideExtraDays={true}
        // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
        // day from another month that is visible in calendar page. Default = false
        disableMonthChange={false}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
        firstDay={1}
        // Hide day names. Default = false
        // hideDayNames={true}
        // Show week numbers to the left. Default = false
        // showWeekNumbers={true}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={(addMonth) => addMonth()}
        theme={{
          // Background colors
          backgroundColor: "transparent",
          calendarBackground: "transparent",
          todayBackgroundColor: globalStyles.colors.green,

          // Text colors
          textSectionTitleColor: "black",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "white",
          dayTextColor: "black",
          textDisabledColor: "rgba(0, 0, 0, 0.3)",
          monthTextColor: "black",

          // Indicator and dot colors
          dotColor: globalStyles.colors.darkGreen,
          indicatorColor: globalStyles.colors.darkGreen,

          // Selected day background color
          // selectedDayBackgroundColor: "#00adf5",

          // Font families
          textDayFontFamily: globalStyles.fontStyle.regular,
          // textMonthFontFamily: globalStyles.fontStyle.bold,
          textDayHeaderFontFamily: globalStyles.fontStyle.bold,
          // textYearFontFamily: globalStyles.fontStyle.bold,

          // Font weights
          textDayFontWeight: "300",
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: "300",

          // Font sizes
          textDayFontSize: globalStyles.fontSize.mediumDescription,
          textMonthFontSize: globalStyles.fontSize.subHeader,
          textDayHeaderFontSize: globalStyles.fontSize.description,
        }}
        style={{ height: 350 }}
      />
    </CalendarProvider>
  );
}
