/**
 * Logo mAI Coder : utilise resources/icons/icon.png partout (M multicolore).
 */
const iconUrl = new URL('../resources/icons/icon.png', import.meta.url).href;

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
