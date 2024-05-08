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
						src="https://i.ibb.co/5WMhstJ/Peluqueria4.jpg"
						alt=""
						effect="blur"
						placeholderSrc={placeholder}
					/>
					<LazyLoadImage
						src="https://i.ibb.co/QbQvgSh/Peluqueria5.jpg"
						alt=""
						effect="blur"
						placeholderSrc={placeholder}
					/>
					<LazyLoadImage
						src="https://i.ibb.co/s2wD5hc/delfina-pan-8esv-Je-VUdes-unsplash.jpg"
						alt=""
						effect="blur"
						placeholderSrc={placeholder}
					/>
					<LazyLoadImage
						src="https://i.ibb.co/yyqF6Bc/logan-weaver-lgnwvr-knzi-Vjrvzt-A-unsplash.jpg"
						alt=""
						effect="blur"
						placeholderSrc={placeholder}
					/>
				</div>
				<div className={styles.column}>
					<LazyLoadImage
						src="https://i.ibb.co/Q6txCLM/joshua-lawrence-d-U6e-E-j2-My8-unsplash.jpghttps://i.ibb.co/r5CJnY1/wells-chan-YYx-Nr-Hsf-Eo-I-unsplash.jpg"
						alt=""
						effect="blur"
						placeholderSrc={placeholder}
					/>
					<LazyLoadImage
						src="https://i.ibb.co/qdpvHQX/jeppe-monster-GOj-F1v-XObrg-unsplash.jpg"
						alt=""
						effect="blur"
						placeholderSrc={placeholder}
					/>
					<LazyLoadImage
						src="https://i.ibb.co/cXW9Hgc/delfina-pan-w-Jo-B8-D3hnzc-unsplash.jpg"
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
