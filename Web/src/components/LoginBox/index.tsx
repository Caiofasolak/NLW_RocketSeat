import styles from './styles.modules.scss';
import {VscGithubInverted} from 'react-icons/vsc'

export function LoginBox(){
  return(
    <div className="loginBoxWrapper">
      <strong>Entre e compartilhe sua mensagem</strong>
      <a href="#" className={styles.singInWithGithub}>
        <VscGithubInverted/>
        Entrar com o Github
      </a>
    </div>
  )
}