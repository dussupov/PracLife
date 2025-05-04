export default function formatMoney(amount) {
	if(amount) {
		return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
	}
}