export default function maskAccountNumber(number) {
	return number.replace(/\d(?=\d{4})/g, '*');
}