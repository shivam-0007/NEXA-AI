import { createContext, useState, useEffect } from "react";
import runChat from "../config/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {
	const [input, setInput] = useState("");
	const [recentPrompt, setRecentPrompt] = useState("");
	const [prevPrompts, setPrevPrompts] = useState(() => {
		try {
			const saved = localStorage.getItem("nexa_prev_prompts");
			return saved ? JSON.parse(saved) : [];
		} catch {
			return [];
		}
	});
	const [showResults, setShowResults] = useState(false);
	const [loading, setLoading] = useState(false);
	const [resultData, setResultData] = useState("");
	const [activeModal, setActiveModal] = useState(null); // 'history' | 'settings' | 'help' | null

	useEffect(() => {
		localStorage.setItem("nexa_prev_prompts", JSON.stringify(prevPrompts));
	}, [prevPrompts]);

	const delayPara = (index, nextWord) => {
		setTimeout(function () {
			setResultData((prev) => prev + nextWord);
		}, 10 * index);
	};

	const newChat = () => {
		setLoading(false);
		setShowResults(false);
		setResultData("");
		setInput("");
	};

	const addToHistory = (prompt) => {
		if (!prompt || !prompt.trim()) return;
		setPrevPrompts((prev) => {
			if (prev[prev.length - 1] === prompt) return prev;
			const updated = [...prev, prompt];
			return updated.slice(-50);
		});
	};

	const clearHistory = () => {
		setPrevPrompts([]);
		localStorage.removeItem("nexa_prev_prompts");
	};

	const onSent = async (prompt) => {
		setResultData("");
		setLoading(true);
		setShowResults(true);
		let response;
		try {
			const finalPrompt = prompt !== undefined ? prompt : input;
			setRecentPrompt(finalPrompt);
			addToHistory(finalPrompt);
			response = await runChat(finalPrompt);

			let responseArray = response.split("**");
			let newResponse = "";
			for (let i = 0; i < responseArray.length; i++) {
				if (i === 0 || i % 2 !== 1) {
					newResponse += responseArray[i];
				} else {
					newResponse += "<b>" + responseArray[i] + "</b>";
				}
			}
			let newResponse2 = newResponse.split("*").join("<br/>");
			let newResponseArray = newResponse2.split("");
			for (let i = 0; i < newResponseArray.length; i++) {
				const nextWord = newResponseArray[i];
				delayPara(i, nextWord + "");
			}
		} catch (error) {
			console.error("Error while running chat:", error);
			setResultData(
				"An error occurred. Check the browser console and ensure your API key is configured."
			);
		} finally {
			setLoading(false);
			setInput("");
		}
	};

	const contextValue = {
		prevPrompts,
		setPrevPrompts,
		onSent,
		setRecentPrompt,
		recentPrompt,
		input,
		setInput,
		showResults,
		loading,
		resultData,
		newChat,
		clearHistory,
		activeModal,
		setActiveModal,
	};

	return (
		<Context.Provider value={contextValue}>{props.children}</Context.Provider>
	);
};

export default ContextProvider;