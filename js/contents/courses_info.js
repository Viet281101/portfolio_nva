
class CoursesInfo {
	constructor(title, description, duration, credits) {
		this.title = title;
		this.desc = description;
		this.duration = duration;
		this.credits = credits;
		this.x_close = "./assets/icons/x_close.png";
	};

	createPopupWindow() {
		const overlay = document.createElement("div");
		overlay.id = "courseInfoOverlay";
		Object.assign(overlay.style, {
			position: "fixed", display: "flex", zIndex: 20,
			top: 0, left: 0, right: 0, bottom: 0,
			backgroundColor: "rgba(0,0,0,0.7)",
			alignItems: "center", justifyContent: "center",
			visibility: "hidden", opacity: 0, transition: "visibility 0s, opacity 0.5s"
		});

		const popup = document.createElement("div");
		Object.assign(popup.style, {
			backgroundColor: "rgba(0,0,0,1)", boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
			padding: "20px", borderRadius: "5px", border: "3px solid #fff", overflowY: "auto",
		});
		popup.style.maxWidth = popup.style.maxHeight = window.innerWidth > 900 ? "70%" : "90%";
		popup.style.fontSize = window.innerWidth > 900 ? "large" : "inherit";
		const closeXButton = this.closeXBtn(overlay);
		popup.appendChild(closeXButton);
		const title = document.createElement("h2");
		title.textContent = this.title;
		popup.appendChild(title);

		const desc = document.createElement("p");
		desc.textContent = this.desc;
		popup.appendChild(desc);

		const duration = document.createElement("p");
		duration.textContent = `Duration: ${this.duration}`;
		popup.appendChild(duration);

		const credits = document.createElement("p");
		credits.textContent = `Credits: ${this.credits}`;
		popup.appendChild(credits);

		const closeButton = this.closeBtn(overlay);
		popup.appendChild(closeButton);

		overlay.appendChild(popup);
		document.body.appendChild(overlay);

		this.showPopup = () => {
			overlay.style.visibility = "visible";
			overlay.style.opacity = "1";
		};
	};

	closeBtn(overlay) {
		const closeButton = document.createElement("button");
		closeButton.textContent = "Close";
		closeButton.title = "Close";
		closeButton.onclick = () => {
			overlay.style.visibility = "hidden";
			overlay.style.opacity = "0";
		};
		Object.assign(closeButton.style, {
			cursor: "pointer", padding: "10px 20px", margin: "20px 0 0",
			border: "none", borderRadius: "5px", textAlign: 'center', 
			backgroundColor: "#444", color: "#fff", 
			fontSize: "16px", fontFamily: "'Pixel', sans-serif",
		});
		return closeButton;
	};

	closeXBtn(overlay) {
		const closeXButton = document.createElement("img");
		closeXButton.src = this.x_close;
		closeXButton.title = "Close";
		closeXButton.className = "popupCloseX";
		closeXButton.addEventListener("click", () => {
			overlay.style.visibility = "hidden";
			overlay.style.opacity = "0";
		});
		Object.assign(closeXButton.style, {
			cursor: "pointer", padding: "5px", float: 'right',
		});
		return closeXButton;
	}
};
