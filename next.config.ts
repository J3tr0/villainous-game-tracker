import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	webpack: (config, { isServer }) => {
		if (!isServer) {
			config.resolve = {
				...config.resolve,
				fallback: {
					...config.resolve?.fallback,
					crypto: false,
				},
			};
		}
		return config;
	},
	serverExternalPackages: ['@google-cloud/local-auth'],
};

export default nextConfig;
