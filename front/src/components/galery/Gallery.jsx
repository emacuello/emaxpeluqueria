import styles from './Gallery.module.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import placeholder from '../../../public/image-404.jpg';
import 'react-lazy-load-image-component/src/effects/blur.css';
const Gallery = () => {
	return (
		<>
			<div className={styles.row}>
				<div className={styles.column}>
					<LazyLoadImage
						src="https://res.cloudinary.com/dxrjz4ycj/image/upload/f_auto,q_auto/v1/peluqueria%20gallery/eo3dx1shnxivxfimq8j5"
						alt=""
						effect="blur"
						placeholderSrc={placeholder}
					/>
					<LazyLoadImage
						src="https://res.cloudinary.com/dxrjz4ycj/image/upload/f_auto,q_auto/v1/peluqueria%20gallery/kkvgvolkkjb9vfwppbqr"
						alt=""
						effect="blur"
						placeholderSrc={placeholder}
					/>
					<LazyLoadImage
						src="https://res.cloudinary.com/dxrjz4ycj/image/upload/f_auto,q_auto/v1/peluqueria%20gallery/jhttesi9gbggkj7jn47k"
						alt=""
						effect="blur"
						placeholderSrc={placeholder}
					/>
					<LazyLoadImage
						src="https://res.cloudinary.com/dxrjz4ycj/image/upload/f_auto,q_auto/v1/peluqueria%20gallery/d2bh3tjx1uo5pvuxhqct"
						alt=""
						effect="blur"
						placeholderSrc={placeholder}
					/>
				</div>
				<div className={styles.column}>
					<LazyLoadImage
						src="https://res.cloudinary.com/dxrjz4ycj/image/upload/f_auto,q_auto/v1/peluqueria%20gallery/hqbrqtwgg6pdrexjtqon"
						alt=""
						effect="blur"
						placeholderSrc={placeholder}
					/>
					<LazyLoadImage
						src="https://res.cloudinary.com/dxrjz4ycj/image/upload/f_auto,q_auto/q7vrqiuabcoxvibpe8ox"
						alt=""
						effect="blur"
						placeholderSrc={placeholder}
					/>
					<LazyLoadImage
						src="https://res.cloudinary.com/dxrjz4ycj/image/upload/f_auto,q_auto/v1/peluqueria%20gallery/vlkb2ygypczphxhatxin"
						alt=""
						effect="blur"
						placeholderSrc={placeholder}
					/>
					<LazyLoadImage
						src="https://i.ibb.co/bQgk9Fp/adam-winger-WXm-Hw-Pc-Famo-unsplash.jpg"
						alt=""
						effect="blur"
						placeholderSrc={placeholder}
					/>
				</div>
			</div>
		</>
	);
};

export default Gallery;
