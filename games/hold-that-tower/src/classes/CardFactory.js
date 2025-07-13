export default class CardFactory {
	static CreateCard(args = {}) {
		const { type, upgradeAmount, upgradeType, upgradeCalculation, description } = args;

		if (!type || !upgradeAmount || !upgradeType || !upgradeCalculation || !description) {
			throw new Error('All card properties must be specified');
		}

		return new Card({
			type,
			upgradeAmount,
			upgradeType,
			upgradeCalculation,
			description
		});
	}
}