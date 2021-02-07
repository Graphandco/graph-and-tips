import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import styles from '../styles/Tip.module.css'
import { AiOutlineCopy } from 'react-icons/Ai';
import { BsChevronLeft } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Link from 'next/link'
import Head from 'next/head'


export const getStaticPaths = async () => {
    const res = await fetch('https://www.graphandco.com/coding-tips/wp-json/wp/v2/coding-tips');
    const data = await res.json();
  
    // map data to an array of path objects with params (id)
    const paths = data.map(tip => {
      return {
        params: { id: tip.id.toString() }
      }
    })
  
    return {
      paths,
      fallback: false
    }
  }
  
  export const getStaticProps = async (context) => {
    const id = context.params.id;
    const res = await fetch('https://www.graphandco.com/coding-tips/wp-json/wp/v2/coding-tips/' + id);
    const data = await res.json();
  
    return {
      props: { tip: data }
    }
  }
  
  const Details = ({ tip }) => {
	  const copyClipboard = (text) => {
		  navigator.clipboard.writeText(text),
		  notify()
		}
	const notify = () => toast.info('Texte copié !', {
		position: "bottom-right",
		autoClose: 2000,
		hideProgressBar: true,
		closeOnClick: false,
		pauseOnHover: false,
		draggable: true,
		progress: undefined,
		});
    return (
		<>
		<Head>
			<title>{tip.title.rendered} | Tips List</title>
			<meta name="keywords" content="tips"/>
		</Head>
      <div>
			<Link href="/"><a className={styles.backButton}><BsChevronLeft />Retour</a></Link>
        <h1>{ tip.title.rendered }</h1>
		{tip.content.rendered !== '' && 		
			<p dangerouslySetInnerHTML={{
				__html: tip.content.rendered,
			}}
        />
		}
		{tip.acf.code.map( tipcode => (
			<div className="tip-code" key={tipcode.contenu_du_code}>
				{tipcode.description_du_code && 
				<div className="tip-code-desc">{tipcode.description_du_code}</div>
				}
				<div className={styles.tipCodeContent}>
					<SyntaxHighlighter
						language={tip.acf.langage==='prestashop' ? 'php' : tip.acf.langage}
					>
						{tipcode.contenu_du_code}
					</SyntaxHighlighter>
					<div className={styles.copyText}>
						<button className={styles.button} onClick={()=> {
							copyClipboard(tipcode.contenu_du_code)}} 
							>
							<AiOutlineCopy />
						</button>
						<ToastContainer />

					</div>
					
				</div>
				
			</div>
		))}

      </div>
	  </>
    );
  }
  
export default Details;