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
import { format } from "date-fns-tz";

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
  // 2023-2024 Philippine Holidays only lang to, kailangan update ulit next 2 years
  const holidays = [
    "2023-01-01", // New Year’s Day
    "2023-04-06", // Maundy Thursday
    "2023-04-07", // Good Friday
    "2023-04-10", // Day of Valor (Araw ng Kagitingan)
    "2023-04-21", // Eid'l Fitr (Feast of Ramadhan)
    "2023-05-01", // Labor Day
    "2023-06-12", // Independence Day
    "2023-06-28", // Eid'l Adha (Feast of Sacrifice)
    "2023-08-28", // National Heroes Day
    "2023-11-27", // Bonifacio Day
    "2023-12-25", // Christmas Day
    "2023-12-30", // Rizal Day
    "2023-02-24", // EDSA People Power Revolution Anniversary
    "2023-04-08", // Black Saturday
    "2023-08-21", // Ninoy Aquino Day
    "2023-11-01", // All Saints’ Day
    "2023-12-08", // Feast of the Immaculate Conception of Mary
    "2023-12-31", // Last Day of the Year
    "2023-10-30", // (Barangay and SK Elections)
    "2023-11-02", // (Thursday)
    "2023-01-02", // (Monday)
    "2023-10-30", // (Barangay and SK Elections)
    "2023-11-02", // (Thursday)
    "2023-01-02", // (Monday)
    "2023-11-01", // All Saints' Day & All Souls' Day (Take a leave on November 3)
    "2023-11-25", // Bonifacio Day
    "2023-12-08", // Feast of the Immaculate Concepcion
    "2023-12-23", // Christmas Day
    "2023-12-30", // Rizal Day, Last Day of the Year, and New Year's Day (Take a leave on November 3)
    "2024-01-01", // New Year’s Day
    "2024-03-28", // Maundy Thursday
    "2024-03-29", // Good Friday
    "2024-04-09", // Day of Valor (Araw ng Kagitingan)
    "2024-05-01", // Labor Day
    "2024-06-12", // Independence Day
    "2024-08-26", // National Heroes Day
    "2024-11-30", // Bonifacio Day
    "2024-12-25", // Christmas Day
    "2024-12-30", // Rizal Day
    "2024-02-10", // Chinese New Year
    "2024-03-30", // Black Saturday
    "2024-08-21", // Ninoy Aquino Day
    "2024-11-01", // All Saints’ Day
    "2024-11-02", // All Souls’ Day
    "2024-12-08", // Feast of the Immaculate Conception of Mary
    "2024-12-24", // Christmas Eve
    "2024-12-31", // Last Day of the Year
  ];

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
      const eventDate = new Date(event.datetime); // Convert the datetime string to a Date object
      const localDate = format(eventDate, "yyyy-MM-dd", {
        timeZone: "Asia/Manila",
      });
      console.log("localDate", eventDate, localDate);
      console.log("Holdays", holidays.includes(localDate));

      const color = colors[index % colors.length];
      const eventMarking = {
        key: event.id,
        color: color,
        selectedDotColor: color,
      };

      if (markedDates[localDate]) {
        markedDates[localDate].dots.push(eventMarking);
      } else {
        markedDates[localDate] = {
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

  holidays.forEach((holiday) => {
    if (!markedDates[holiday]) {
      markedDates[holiday] = {
        selected: true,
        selectedColor: "transparent",
        selectedTextColor: "red",
        activeOpacity: 0,
      };
    }
  });

  const handleDayPress = (day) => {
    setSelected(day.dateString);
    onDayPress(day.dateString);
  };

  return (
    <CalendarProvider>
      {/* <ExpandableCalendar/> */}
      <Calendar
        current={currentDate.toISOString().split("T")[0]}
        minDate={"2000-01-01"}
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
