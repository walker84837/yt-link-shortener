function handleLinkConversion(): void {
	let linkInput = document.getElementById("youtube-link-input") as HTMLInputElement;
	if (!linkInput) {
		console.error("YouTube link input element not found.");
		return;
	}

	let link = linkInput.value.trim();
	let convertedLink = "";

	if (link.indexOf("youtube.com") !== -1) {
		let videoId: string;
		if (link.indexOf("/shorts/") !== -1) {
			videoId = link.substring(link.indexOf("/shorts/") + 8);
		} else if (link.indexOf("?feature=share") !== -1) {
			videoId = link.substring(link.indexOf("?feature=share") + 14);
		} else {
			videoId = link.substring(link.indexOf("v=") + 2);
		}

		if (videoId.indexOf("&") !== -1) {
			videoId = videoId.substring(0, videoId.indexOf("&"));
		}

		convertedLink = "https://youtu.be/" + videoId;

		if (convertedLink.charAt(convertedLink.length - 1) === "'") {
			convertedLink = convertedLink.slice(0, -1);
		}
	} else if (link.indexOf("youtu.be") !== -1) {
		convertedLink =
			link.charAt(link.length - 1) === "'" ? link.slice(0, -1) : link;
	}

	let resultElement = document.getElementById("converted-link-result");
	if (!resultElement) {
		console.error("Converted link result element not found.");
		return;
	}

	if (convertedLink) {
		resultElement.textContent = convertedLink;
	} else {
		resultElement.textContent = "Invalid YouTube link!";
	}
}

let convertButton = document.getElementById("convert-button");
if (convertButton) {
	convertButton.addEventListener("click", handleLinkConversion);
} else {
	console.error("Convert button element not found.");
}