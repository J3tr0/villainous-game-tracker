'use client';

export function formatDate(dateString: string) {
	try {
		// Crea l'oggetto Date
		const date = new Date(dateString);

		// Verifica se la data è valida
		if (isNaN(date.getTime())) {
			return dateString;
		}

		console.log('Date object:', date);

		// Formatta la data in italiano
		return date.toLocaleDateString('it-IT', {
			day: 'numeric',
			month: 'short',
			year: 'numeric',
		});
	} catch {
		return dateString;
	}
}
