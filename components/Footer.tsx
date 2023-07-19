import { Github } from 'react-bootstrap-icons';

export default function Footer() {
  return (
    <div className="align-center mt-2 px-1 text-xs text-slate-400">
      <div className="flex flex-row gap-2">
        <div className="grow">
          This site is not affiliated with BattleBit Remastered/OkiStudio
        </div>
        <div className="flex-none">
          <a href="https://github.com/jagardaniel/battlebit-serverbrowser"><Github size={20} /></a>
        </div>
      </div>
    </div>
  );
}
