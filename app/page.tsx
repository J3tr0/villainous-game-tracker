import Footer from '@/components/Footer';
import Header from '@/components/Header';
export default function Home() {
	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex-grow p-4">
				<Header />
			</main>
			<Footer />
		</div>
	);
}
