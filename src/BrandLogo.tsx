/**
 * Logo mAI Coder : utilise public/logo.png (M multicolore) partout.
 */
const iconUrl = new URL('../public/logo.png', import.meta.url).href;

export function BrandLogo({
	className,
	size = 22,
	'aria-label': ariaLabel,
}: {
	className?: string;
	size?: number;
	'aria-label'?: string;
}) {
	return (
		<img
			className={className}
			src={iconUrl}
			width={size}
			height={size}
			alt={ariaLabel ?? 'mAI Coder'}
			role={ariaLabel ? 'img' : undefined}
			aria-hidden={ariaLabel ? undefined : true}
			aria-label={ariaLabel}
			style={{ objectFit: 'contain', display: 'inline-block' }}
			draggable={false}
		/>
	);
}
