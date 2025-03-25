export const load = async (event) => {
	const parentData = await event.parent();

	const { proceso, certificacion, empleador, profesionista } = parentData;

	return {
		proceso,
		certificacion,
		empleador,
		profesionista
	};
};
