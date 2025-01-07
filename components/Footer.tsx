const Footer = () => {
	return (
		<footer className="w-full py-4 mt-8 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
			<div className="max-w-2xl mx-auto px-4 space-y-4">
				<p>
					Disney Villainous<sup>®</sup> è un marchio registrato di Disney.
					Questo sito non è affiliato, associato, autorizzato, approvato da, o
					in alcun modo ufficialmente collegato a Disney o Ravensburger.
				</p>

				<p className="text-center flex justify-center items-center">
					<a
						href="https://docs.google.com/spreadsheets/d/1mKCxWAJWHdQzi0tTH_2grxrdZRl5A49HPxM-3O2bpRg"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-2 text-primary hover:underline">
						<span>
							I dati sono raccolti dal foglio Google della community Villainous
							Italia
						</span>
					</a>
				</p>
			</div>
		</footer>
	);
};

export default Footer;
