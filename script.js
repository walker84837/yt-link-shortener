/**
 * handle_link_conversion.
 */
function handle_link_conversion()
{
	let link_input = document.getElementById("youtube-link-input");
	if (!link_input) {
		console.error("ERROR: The input element for the YouTube link was not found.");
		return;
	}
	let link = link_input.value.trim();
	let converted_link = "";
	if (link.indexOf("youtube.com") !== -1) {
		let video_id = void 0;
		if (link.indexOf("/shorts/") !== -1) {
			video_id = link.substring(link.indexOf("/shorts/") + 8);
		} else if (link.indexOf("?feature=share") !== -1) {
			video_id = link.substring(link.indexOf("?feature=share") + 14);
		} else {
			video_id = link.substring(link.indexOf("v=") + 2);
		} if (video_id.indexOf("&") !== -1) {
			video_id = video_id.substring(0, video_id.indexOf("&"));
		}
		converted_link = "https://youtu.be/" + video_id;
		if (converted_link.charAt(converted_link.length - 1) === "'") {
			converted_link = converted_link.slice(0, -1);
		}
	} else if (link.indexOf("youtu.be") !== -1 || link.indexOf("?si") !== -1) {
		video_id = link.substring(link.indexOf("?si") + 3);
		converted_link = link.charAt(link.length - 1) === "'" ? link.slice(0, -1) : link;
	}
	let result_element = document.getElementById("converted-link-result");
	if (!result_element) {
		console.error("ERROR: Could not find the converted link result element.");
		return;
	} if (converted_link) {
		result_element.textContent = converted_link;
	} else {
		result_element.textContent = "ERROR: an invalid YouTube link was provided.";
	}
}

let convert_button = document.getElementById("convert-button");

if (convert_button) {
	convert_button.addEventListener("click", handle_link_conversion);
} else {
	console.error("ERROR: Unable to find the convert button element.");
}
