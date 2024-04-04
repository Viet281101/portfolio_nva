<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$name = strip_tags(trim($_POST["name"]));
	$email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
	$message = trim($_POST["message"]);

	$to = "nva281101@gmail.com"; 

	$subject = "New contact from $name";

	$email_content = "Name: $name\n";
	$email_content .= "Email: $email\n\n";
	$email_content .= "Message:\n$message\n";

	$email_headers = "From: $name <$email>";

	if (mail($to, $subject, $email_content, $email_headers)) {
		http_response_code(200);
		echo "Thank You! Your message has been sent.";
	} else {
		http_response_code(500);
		echo "Oops! Something went wrong and we couldn't send your message.";
	}
} else {
	http_response_code(403);
	echo "There was a problem with your submission, please try again.";
}
?>
