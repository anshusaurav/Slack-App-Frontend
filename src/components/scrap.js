{/* <form onSubmit={this.handleFormSubmit}>
                    <div className="bg-gray-100 px-8 py-4 mb-8">
                        <div className="max-w-screen-xl mx-auto">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-gray-700 font-medium text-sm">
                                        <NavLink to="/dashboard">Dashboard</NavLink>/Create Standup
                                    </p>
                                    <input
                                        type="text"
                                        className="px-4 py-2 text-2xl mt-4 mb-2 outline-none border-2 border-gray-500 rounded-lg w-100"
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
                                            className="border-2 px-12 py-2 rounded-full border-teal-500 font-medium hover:bg-teal-500 text-teal-500  hover:text-white hover:shadow-xl"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10"
                                                            stroke="currentColor"
                                                            strokeWidth="4">
                                                        </circle>
                                                        <path className="opacity-75" fill="currentColor"
                                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">

                                                        </path>
                                                    </svg> Saving</>) : (
                                                    <> <HiCheck className="inline-block text-xl m-1 cursor-pointer" /> Save</>)}
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            className="border-2 px-12 py-2 rounded-full border-teal-500 font-medium text-teal-500 opacity-50 cursor-not-allowed"
                                        >
                                            <HiCheck className="inline-block text-xl m-1 cursor-pointer" />
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
                                            placeholder={selectedTimezone.length ? selectedTimezone[0].id : ""}
                                            onChange={this.handleSelectionTimezone}
                                            values={selectedTimezone[0].id}
                                        />
                                        <div className="flex items-center pb-1">
                                            <h1 className="font-bold text-lg text-gray-700">Days</h1>
                                        </div>
                                        {days.map((btn) => {
                                            if (cronDays.includes(btn.id)) {
                                                return (
                                                    <button
                                                        key={uuid()}
                                                        className="w-12 h-12 bg-blue-800 border-2 mx-1 rounded-circle text-teal-500 font-bold focus:outline-none hover:border-gray-300"
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
                                                        className="w-12 h-12 bg-transparent border-2 mx-1 rounded-circle text-black font-bold focus:outline-none hover:border-gray-300"
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

                                className="p-1 border-2 bg-gray-100 text-sm rounded-lg focus:outline-none hover:bg-white hover:border-gray-300"
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
                                placeholder={selectedChannels.length ? selectedChannels[0].label : ""}
                                onChange={this.handleSelection}
                                value={selectedChannels}
                            />
                        </div>
                    </div>
                </form> */}