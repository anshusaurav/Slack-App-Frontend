import React, { Component } from "react";
import { HiQuestionMarkCircle, HiXCircle, HiCheck } from "react-icons/hi";
import Select from "react-dropdown-select";
import { v4 as uuid } from "uuid";
import { INSERT_STANDUP } from "./../graphql/queries"
import { executeOperation, } from "./../graphql/helpers"
import { timeZoneList } from "./../slack/timezones"
// import { INSERT_STANDUP } from "../graphql/queries";
import { NavLink, withRouter } from "react-router-dom";

const days = [
  { id: 0, day: "S" },
  { id: 1, day: "M" },
  { id: 2, day: "T" },
  { id: 3, day: "W" },
  { id: 4, day: "T" },
  { id: 5, day: "F" },
  { id: 6, day: "S" },
];
class CreateStandup extends Component {
  // const [state, setState] = useState({
  //   standupName: "",
  //   message: "",
  //   questions: [{ id: uuid(), text: "" }],
  //   selectedChannels: [],
  //   options: [],
  //   cronDays: [1, 2, 3, 4, 5],
  //   cronTime: "10:00 AM",
  // });

  // const {
  //   standupName,
  //   message,
  //   selectedChannels,
  //   options,
  //   cronDays,
  //   cronTime,
  //   questions,
  // } = state;

  // const { channels, user } = props;

  // function convertToOptions(channels) {
  //   return channels.reduce((options, channel) => {
  //     const option = {
  //       id: channel.id,
  //       value: channel.name,
  //       label: channel.name,
  //     };
  //     options.push(option);
  //     return options;
  //   }, []);
  // }

  // useEffect(() => {
  //   if (channels.length) {
  //     const options = convertToOptions(channels);
  //     setState({ ...state, options });
  //   }
  // }, [channels]);

  // const handleSelection = (value) => {
  //   setState({ ...state, selectedChannels: value });
  // };

  // const handleChange = ({ target: { name, value } }) => {
  //   setState({ ...state, [name]: value });
  // };

  // const handleCronDays = (day) => {
  //   if (!cronDays.includes(day)) {
  //     setState({ ...state, cronDays: cronDays.concat(day) });
  //   } else {
  //     let filtered = cronDays.filter((el) => el !== day);
  //     setState({ ...state, cronDays: filtered });
  //   }
  // };

  // // const [insertStandup] = useMutation(INSERT_STANDUP);
  // let history = useHistory();

  // const days = [
  //   { id: 0, day: "S" },
  //   { id: 1, day: "M" },
  //   { id: 2, day: "T" },
  //   { id: 3, day: "W" },
  //   { id: 4, day: "T" },
  //   { id: 5, day: "F" },
  //   { id: 6, day: "S" },
  // ];

  // function handleQuestionsOnChange(e, id) {
  //   e.preventDefault();
  //   let filter = questions.map((ques) => {
  //     if (ques.id === id) {
  //       ques.text = e.target.value;
  //     }
  //     return ques;
  //   });
  //   // console.log(filter);
  //   setState({ ...state, questions: filter });
  // }

  // function handleQuestionDelete(e, id) {
  //   e.preventDefault();
  //   if (questions.length > 1) {
  //     let filteredQues = questions.filter((ques) => ques.id !== id);
  //     setState({ ...state, questions: filteredQues });
  //   }
  // }

  // function handleAddMoreQuestion(e) {
  //   e.preventDefault();
  //   let newQues = { id: uuid(), text: "" };
  //   setState({ ...state, questions: [...questions, newQues] });
  // }

  // function handleTimeValidation(e) {
  //   let inputTime = e.target.value;
  //   let regexp = /^(0?[1-9]|1[012])(:[0-5]\d) [APap][mM]$/;
  //   let isTimeValid = regexp.test(inputTime);
  //   if (!isTimeValid) {
  //     setState({ ...state, cronTime: "10:00 AM" });
  //   }
  // }

  // function cronGenerate() {
  //   let minutes = `${cronTime.charAt(3)}${cronTime.charAt(4)}`;
  //   let days = `${cronDays.sort().join()}`;
  //   let hour = `${cronTime.charAt(0)}${cronTime.charAt(1)}`;
  //   if (cronTime.includes("PM")) {
  //     hour = `${cronTime.charAt(0)}${cronTime.charAt(1)}`;
  //     hour = +hour + 12;
  //   }
  //   let cron = `${minutes} ${hour} * * ${days}`;
  //   return cron;
  // }

  // function handleFormSubmit(e) {
  //   e.preventDefault();

  //   let dataToSend = {
  //     channel: selectedChannels.length ? selectedChannels[0].id : "",
  //     creator_slack_id: user.authed_user.id,
  //     cron_text: cronGenerate(),
  //     message: message.trim(),
  //     name: standupName.trim(),
  //     questions: questions.filter((ques) => ques.text).map((ques) => ques.text),
  //     timezone: "Asia/Kolkata",
  //   };
  //   // console.log(dataToSend);
  //   // insertStandup({ variables: dataToSend });
  //   history.push("/dashboard");
  // }
  constructor(props) {
    super(props);
    this.state = {
      standupName: "",
      message: "",
      questions: [{ id: uuid(), text: "" }],
      selectedChannels: [],
      options: [],
      timezones: [],
      cronDays: [1, 2, 3, 4, 5],
      cronTime: "10:00 AM",
      selectedTimezone: ["(GMT+05:30) Asia/Kolkata"],
      isLoading: false
    }
  }
  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };
  handleTimeValidation = (e) => {
    let inputTime = e.target.value;
    let regexp = /^(0?[1-9]|1[012])(:[0-5]\d) [APap][mM]$/;
    let isTimeValid = regexp.test(inputTime);
    if (!isTimeValid) {
      this.setState({ cronTime: "10:00 AM" });
    }
  }

  handleCronDays = (day) => {
    if (!this.state.cronDays.includes(day)) {
      this.setState({ cronDays: this.state.cronDays.concat(day) });
    } else {
      let filtered = this.state.cronDays.filter((el) => el !== day);
      this.setState({ cronDays: filtered });
    }
  };
  handleQuestionDelete = (e) => {
    e.preventDefault();
    const id = e.target.closest('div').dataset.questionId || '';
    console.log(this.state.questions, id, e.target.dataset.questionId)
    if (this.state.questions.length > 1) {
      let filteredQues = this.state.questions.filter((ques) => ques.id !== id);
      this.setState({ questions: filteredQues });
    }
  }

  handleAddMoreQuestion = (e) => {
    e.preventDefault();
    // let cntUnfilled = this.state.questions.reduce((acc, question) => {
    //   return question.text.trim().length === 0 ? acc : acc + 1;
    // }, 0)
    // if (cntUnfilled <= 1)
    //   return;
    let newQues = { id: uuid(), text: "" };
    this.setState({ questions: this.state.questions.concat(newQues) });
  }

  handleQuestionsOnChange = (e) => {
    e.preventDefault();
    const id = e.target.closest('div').dataset.questionId || '';

    let filter = this.state.questions.map((ques) => {
      if (ques.id === id) {
        ques.text = e.target.value;
      }
      return ques;
    });
    // console.log(filter);
    this.setState({ questions: filter });
  }
  handleSelection = (value) => {
    this.setState({ selectedChannels: value });
  };
  handleSelectionTimezone = (value) => {
    this.setState({ selectedTimezone: value })
  }
  convertToOptions = (channels) => {
    return channels.reduce((options, channel) => {
      const option = {
        id: channel.id,
        value: channel.name,
        label: channel.name,
      };
      options.push(option);
      return options;
    }, []);
  }
  convertToOptionsTimezones = (timezoneList) => {
    return timeZoneList.reduce((options, tz) => {
      const option = {
        id: tz.value,
        value: tz.value,
        label: tz.label,
      };
      options.push(option);
      return options;
    }, []);
  }
  cronGenerate = () => {
    const { cronTime, cronDays } = this.state;
    let minutes = `${cronTime.charAt(3)}${cronTime.charAt(4)}`;
    let days = `${cronDays.sort().join()}`;
    let hour = `${cronTime.charAt(0)}${cronTime.charAt(1)}`;
    if (cronTime.includes("PM")) {
      hour = `${cronTime.charAt(0)}${cronTime.charAt(1)}`;
      hour = +hour + 12;
    }
    let cron = `${minutes} ${hour} * * ${days}`;
    return cron;
  }
  handleFormSubmit = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true }, async () => {
      const { selectedChannels, message, standupName, questions, selectedTimezone } = this.state;
      const creator_slack_id = this.props.slackUser.authed_user.id;
      let dataToSend = {
        channel: selectedChannels.length ? selectedChannels[0].id : "",
        creator_slack_id,
        cron_text: this.cronGenerate(),
        message: message.trim(),
        name: standupName.trim(),
        questions: questions.filter((ques) => ques.text).map((ques) => ques.text),
        timezone: selectedTimezone.length ? selectedTimezone[0].id : "",
      };
      let res1 = await executeOperation(
        dataToSend,
        INSERT_STANDUP
      );
      console.log(res1);
      this.setState({ isLoading: false })
      // insertStandup({ variables: dataToSend });
      this.props.history.push('/dashboard')
    })

  }
  init = async () => {
    const channels = JSON.parse(localStorage.channels);
    const options = this.convertToOptions(channels);
    this.setState({ options }, () => {
      const timezones = this.convertToOptionsTimezones(timeZoneList)
      console.log(timezones)
      this.setState({ timezones })
    });

  };
  componentDidMount() {
    this.init();
  }
  render() {
    const { standupName, message, questions, selectedChannels, options, cronDays, cronTime, selectedTimezone, timezones, isLoading } = this.state;
    return (
      <form onSubmit={this.handleFormSubmit}>
        <div className="bg-gray-300 px-8 py-4 mb-8">
          <div className="max-w-screen-xl mx-auto">
            <div className="flex justify-between border-2 items-center">
              <div>
                <p className="text-gray-700 font-medium text-sm">
                  <NavLink to="/dashboard">Dashboard</NavLink>/Create Standup
              </p>
                <input
                  type="text"
                  className="px-4 py-2 text-2xl mt-4 mb-2 outline-none border-2 border-gray-500 rounded-lg w-100%"
                  placeholder="Enter a name"
                  name="standupName"
                  onChange={this.handleChange}
                  value={standupName}
                />
              </div>
              {standupName &&
                message &&
                questions[0].text &&
                selectedChannels.length ? (
                  <button
                    type="submit"
                    className="border-2 px-12 py-2 rounded-full border-teal-500 font-medium hover:bg-teal-500 text-teal-500  outline-none hover:text-white"
                  >
                    {isLoading ? (<><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg> Saving</>) : (<> <HiCheck className="inline-block text-xl m-1 text-teal-500 cursor-pointer" /> Save</>)}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="border-2 px-12 py-2 rounded-full border-teal-500 font-medium text-teal-500 opacity-50 cursor-not-allowed"
                  ><HiCheck className="inline-block text-xl m-1 text-teal-500 cursor-pointer" />
                    Save
                  </button>
                )}
            </div>
          </div>
        </div>
        <div className="px-8 pb-6">
          <div className="max-w-screen-xl mx-auto">
            <div className="hover:bg-white flex justify-between items-center">
              <div>
                <div className="flex items-center pb-1">
                  <h1 className="font-bold text-lg text-gray-700">Schedule</h1>

                  <HiQuestionMarkCircle className="text-xl m-1 text-gray-600 cursor-pointer" />
                </div>
                <div className="flex items-center pb-1">
                  <h1 className="font-bold text-lg text-gray-700">Time</h1>
                </div>
                <div className="p-1">
                  <input
                    type="text"
                    name="cronTime"
                    placeholder="10:00 AM"
                    onChange={this.handleChange}
                    onPointerLeave={(e) => this.handleTimeValidation(e)}
                    value={cronTime}
                    className="border-2 p-2 mr-4 rounded-lg"
                  />
                  <div className="flex items-center pb-1">
                    <h1 className="font-bold text-lg text-gray-700">Timezone</h1>
                  </div>
                  <DropDownSelect
                    name="selectedTimezone"
                    options={timezones}
                    placeholder="Select Timezone..."
                    onChange={this.handleSelectionTimezone}
                    value={selectedTimezone}
                  />
                  <div className="flex items-center pb-1">
                    <h1 className="font-bold text-lg text-gray-700">Days</h1>
                  </div>
                  {days.map((btn) => {
                    if (cronDays.includes(btn.id)) {
                      return (
                        <button
                          key={uuid()}
                          className="py-2 px-4 bg-blue-800 border-2 mx-1 rounded-full text-teal-500 font-bold"
                          onClick={() => this.handleCronDays(btn.id)}
                          type="button"
                        >
                          {btn.day}
                        </button>
                      );
                    } else {
                      return (
                        <button
                          key={uuid()}
                          className="py-2 px-4 bg-transparent border-2 mx-1 rounded-full text-black font-bold"
                          onClick={() => this.handleCronDays(btn.id)}
                          type="button"
                        >
                          {btn.day}
                        </button>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-8 pb-6">
          <div className="max-w-screen-xl mx-auto">
            <div className="hover:bg-white">
              <div>
                <div className="flex items-center pb-1">
                  <h1 className="font-bold text-lg text-gray-700">Message</h1>
                  <HiQuestionMarkCircle className="text-xl m-1 text-gray-600 cursor-pointer" />
                </div>
                <div className="items-center pb-1 w-full">
                  <textarea
                    name="message"
                    rows="3"
                    className="border-2 p-2 resize-none w-full  rounded-lg"
                    // style={{ resize: "none" }}
                    onChange={this.handleChange}
                    value={message}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-8 pb-6">
          <div className="max-w-screen-xl mx-auto">
            <div className="hover:bg-white">
              <div className="flex items-center pb-1">
                <h1 className="font-bold text-lg text-gray-700">Questions</h1>
                <HiQuestionMarkCircle className="text-xl m-1 text-gray-600 cursor-pointer" />
              </div>
            </div>
            <div className="flex flex-col">
              {questions.map((ques) => (
                <div
                  key={ques.id}
                  data-question-id={ques.id}
                  className="border-2 p-2 my-2 flex justify-between rounded-lg"
                >
                  <input
                    type="text"
                    className="w-full outline-none "
                    value={ques.text}
                    name="questions"
                    onChange={this.handleQuestionsOnChange}
                    placeholder="Enter your question here"
                  />
                  <button
                    type="button outline-none"
                    onClick={this.handleQuestionDelete}
                  >
                    <HiXCircle className="text-xl m-1 text-gray-600 cursor-pointer" />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={this.handleAddMoreQuestion}
              className="p-1 border-2 bg-gray-100 text-sm rounded-lg"
            >
              + Add Question
          </button>
          </div>
        </div>
        <div className="px-8 pb-6">
          <div className="max-w-screen-xl mx-auto">
            <div className="hover:bg-white">
              <div className="flex items-center pb-1">
                <h1 className="font-bold text-lg text-gray-700">
                  Broadcast channel
              </h1>
                <HiQuestionMarkCircle className="text-xl m-1 text-gray-600 cursor-pointer" />
              </div>
            </div>
            <DropDownSelect
              name="selectedChannels"
              options={options}
              className="rounded-lg"
              placeholder="Slack broadcast channel"
              onChange={this.handleSelection}
              value={selectedChannels}
            />
          </div>
        </div>
      </form>
    );
  }
}
function DropDownSelect(props) {
  return (
    <Select
      style={{ borderRadius: "8px", fontFamily: "inherit", fontSize: 18, fontWeight: 500, border: "2px solid #e2e8f0", height: 44 }}
      backspaceDelete={true}
      closeOnSelect={true}
      keepSelectedInList={false}
      options={props.options}
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
      name={props.name}
    />
  );
}
export default withRouter(CreateStandup)