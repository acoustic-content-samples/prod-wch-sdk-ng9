import memoizeIntlConstructor from 'intl-format-cache';
import { IntlMessageFormat, Options } from 'intl-messageformat';
import { UnaryFunction } from 'rxjs';

declare type FormatInput = Parameters<IntlMessageFormat['format']>[0];
declare type FormatResult = ReturnType<IntlMessageFormat['format']>;
declare type FormatFunction = (aInput?: FormatInput) => FormatResult;

const { NumberFormat, DateTimeFormat, PluralRules } = Intl;

function memoize<T>(aCreator: () => T): () => T {
  let cached: T;
  return () => cached || (cached = aCreator());
}

// performance optimization
const OPTIONS: () => Options = memoize(() => ({
  formatters: {
    getNumberFormat: memoizeIntlConstructor(NumberFormat),
    getDateTimeFormat: memoizeIntlConstructor(DateTimeFormat),
    getPluralRules: memoizeIntlConstructor(PluralRules)
  }
}));

const genFormatMessage = (
  aLocale: string
): UnaryFunction<string, FormatFunction> => (aValue: string) => {
  const cached = memoize(
    () => new IntlMessageFormat(aValue, aLocale, undefined, OPTIONS())
  );
  return (aData: FormatInput | undefined) => cached().format(aData);
};

const missingKey = (aKey: string): FormatFunction => () => aKey;

export enum NLS_KEY {
  ADD,
  CLOSE_PALETTE,
  COPY,
  DROP_HERE,
  DROP_TO_UPLOAD,
  EDIT_IMAGE,
  EMPTY_HTML_DESCRIPTION,
  EMPTY_SAVED_BLOCK_DESCRIPTION,
  EMPTY_STATE_DESCRIPTION,
  GET_TEXT_INPUT_CANCEL,
  GET_TEXT_INPUT_OK,
  INITIAL_SECTION,
  LOCK,
  MOVE,
  OPEN_PALETTE,
  PZN_PICKER_CLOSE,
  PZN_PICKER_HEADING,
  REMOVE,
  REMOVE_IMAGE,
  SAVE_BLOCK,
  SAVE_BLOCK_INPUT,
  SAVE_BLOCK_TITLE,
  SELECT,
  SELECT_CONTENT,
  SHUTTERSTOCK_SAVE
}
export enum NLS_LOCALE {
  DE,
  EN,
  ES,
  FR,
  IT,
  JA,
  KO,
  PT_BR,
  SV,
  ZH,
  ZH_TW
}

function createEn() {
  const formatMessage = genFormatMessage('en');
  return [
    formatMessage('Add a section'),
    formatMessage('Close'),
    formatMessage('Copy'),
    formatMessage('Drop here'),
    formatMessage('Drop to upload'),
    formatMessage('Edit image'),
    formatMessage('Add your HTML'),
    formatMessage('Add a saved block'),
    formatMessage('Drag and drop image, or [browse library].'),
    formatMessage('Cancel'),
    formatMessage('Ok'),
    formatMessage('Select a layout or drag content here'),
    formatMessage('Lock to prevent editing'),
    formatMessage('Click and hold to drag'),
    formatMessage('Change image'),
    formatMessage('Close'),
    formatMessage('Choose a personalization field'),
    formatMessage('Remove'),
    formatMessage('Remove image'),
    formatMessage('Save block'),
    formatMessage('Name'),
    formatMessage('Save Block'),
    formatMessage('Select image'),
    formatMessage('Select content'),
    formatMessage('Save ...')
  ];
}
const generateEn = memoize(createEn);

function createDe() {
  const formatMessage = genFormatMessage('de');
  return Object.assign([], generateEn(), [
    formatMessage('Abschnitt hinzufügen'),
    formatMessage('Schließen'),
    formatMessage('Kopieren'),
    formatMessage('Hier ablegen'),
    formatMessage('Für Upload ablegen'),
    formatMessage('Bild bearbeiten'),
    formatMessage('Ihre HTML hinzufügen'),
    ,
    formatMessage(
      'Bild per Drag-and-Drop verschieben oder [Bibliothek durchsuchen].'
    ),
    ,
    ,
    formatMessage('Layout auswählen oder Inhalt hierhinziehen'),
    formatMessage('Sperren, um Bearbeitung zu verhindern'),
    formatMessage(
      'Klicken Sie und halten Sie die Maustaste gedrückt, um den Inhalt zu ziehen'
    ),
    formatMessage('Bild ändern'),
    formatMessage('Schließen'),
    formatMessage('Personalisierungsfeld wählen'),
    formatMessage('Entfernen'),
    formatMessage('Bild entfernen'),
    ,
    ,
    ,
    formatMessage('Bild auswählen'),
    ,
    formatMessage('Speichern...')
  ]);
}
const generateDe = memoize(createDe);

function createIt() {
  const formatMessage = genFormatMessage('it');
  return Object.assign([], generateEn(), [
    formatMessage('Aggiungi una sezione'),
    formatMessage('Chiudi'),
    formatMessage('Copia'),
    formatMessage('Rilascia qui'),
    formatMessage('Rilascia per caricare'),
    formatMessage('Modifica immagine'),
    formatMessage('Aggiungi HTML'),
    ,
    formatMessage(
      "Trascinare e rilasciare l'immagine o [sfogliare la libreria]."
    ),
    ,
    ,
    formatMessage('Selezionare un layout o trascinare il contenuto qui'),
    formatMessage('Blocca per impedire la modifica'),
    formatMessage('Fai clic e tieni premuto per trascinare'),
    formatMessage('Cambia immagine'),
    formatMessage('Chiudi'),
    formatMessage('Scegli un campo di personalizzazione'),
    formatMessage('Rimuovi'),
    formatMessage('Rimuovi immagine'),
    ,
    ,
    ,
    formatMessage('Seleziona immagine'),
    ,
    formatMessage('Salva...')
  ]);
}
const generateIt = memoize(createIt);

function createJa() {
  const formatMessage = genFormatMessage('ja');
  return Object.assign([], generateEn(), [
    formatMessage('セクションの追加'),
    formatMessage('閉じる'),
    formatMessage('コピー'),
    formatMessage('ここにドロップ'),
    formatMessage('ドロップしてアップロード'),
    formatMessage('イメージの編集'),
    formatMessage('HTML の追加'),
    ,
    formatMessage(
      'イメージをドラッグ・アンド・ドロップするか、[ライブラリーを参照します]。'
    ),
    ,
    ,
    formatMessage(
      'レイアウトを選択するか、ここにコンテンツをドラッグしてください'
    ),
    formatMessage('ロックして編集を防止'),
    formatMessage('クリックしたままドラッグ'),
    formatMessage('イメージの変更'),
    formatMessage('閉じる'),
    formatMessage('パーソナライゼーション・フィールドの選択'),
    formatMessage('削除'),
    formatMessage('イメージの削除'),
    ,
    ,
    ,
    formatMessage('イメージの選択'),
    ,
    formatMessage('保存 ...')
  ]);
}
const generateJa = memoize(createJa);

function createKo() {
  const formatMessage = genFormatMessage('ko');
  return Object.assign([], generateEn(), [
    formatMessage('섹션 추가'),
    formatMessage('닫기'),
    formatMessage('복사'),
    formatMessage('여기에 놓기'),
    formatMessage('업로드를 위해 놓기'),
    formatMessage('이미지 편집'),
    formatMessage('HTML 추가'),
    ,
    formatMessage('이미지를 끌어서 놓거나, [라이브러리를 찾아보십시오].'),
    ,
    ,
    formatMessage('레이아웃을 선택하거나 컨텐츠를 여기로 끌기'),
    formatMessage('편집 방지를 위해 잠금'),
    formatMessage('클릭한 상태에서 끌기'),
    formatMessage('이미지 변경'),
    formatMessage('닫기'),
    formatMessage('개인화 필드 선택'),
    formatMessage('제거'),
    formatMessage('이미지 제거'),
    ,
    ,
    ,
    formatMessage('이미지 선택'),
    ,
    formatMessage('저장...')
  ]);
}
const generateKo = memoize(createKo);

function createPtBr() {
  const formatMessage = genFormatMessage('pt-BR');
  return Object.assign([], generateEn(), [
    formatMessage('Incluir uma seção'),
    formatMessage('Fechar'),
    formatMessage('Copiar'),
    formatMessage('Solte aqui'),
    formatMessage('Solte para fazer upload'),
    formatMessage('Editar imagem'),
    formatMessage('Incluir seu HTML'),
    ,
    formatMessage('Arraste e solte uma imagem ou [procure bibliotecas].'),
    ,
    ,
    formatMessage('Selecione um layout ou arraste o conteúdo aqui'),
    formatMessage('Bloqueie para evitar a edição'),
    formatMessage('Clique e pressione para arrastar'),
    formatMessage('Mudar imagem'),
    formatMessage('Fechar'),
    formatMessage('Escolha um campo de personalização'),
    formatMessage('Remover'),
    formatMessage('Remover imagem'),
    ,
    ,
    ,
    formatMessage('Selecionar imagem'),
    ,
    formatMessage('Salvar ...')
  ]);
}
const generatePtBr = memoize(createPtBr);

function createEs() {
  const formatMessage = genFormatMessage('es');
  return Object.assign([], generateEn(), [
    formatMessage('Añadir una sección'),
    formatMessage('Cerrar'),
    formatMessage('Copiar'),
    formatMessage('Soltar aquí'),
    formatMessage('Soltar para cargar'),
    formatMessage('Editar imagen'),
    formatMessage('Añadir el HTML'),
    ,
    formatMessage('Arrastre y suelte la imagen o [examine la biblioteca].'),
    ,
    ,
    formatMessage('Seleccione un diseño o arrastre el contenido aquí'),
    formatMessage('Bloquear para impedir la edición'),
    formatMessage('Pulsar y mantener para arrastrar'),
    formatMessage('Cambiar imagen'),
    formatMessage('Cerrar'),
    formatMessage('Elegir un campo de personalización'),
    formatMessage('Eliminar'),
    formatMessage('Eliminar imagen'),
    ,
    ,
    ,
    formatMessage('Seleccionar imagen'),
    ,
    formatMessage('Guardar...')
  ]);
}
const generateEs = memoize(createEs);

function createZh() {
  const formatMessage = genFormatMessage('zh');
  return Object.assign([], generateEn(), [
    formatMessage('添加一个部分'),
    formatMessage('关闭'),
    formatMessage('复制'),
    formatMessage('放到此处'),
    formatMessage('拖到此处以上载'),
    formatMessage('编辑图像'),
    formatMessage('添加 HTML'),
    ,
    formatMessage('拖放图像，或[浏览库]。'),
    ,
    ,
    formatMessage('选择布局或将内容拖拽到此处'),
    formatMessage('锁定以防止进行编辑'),
    formatMessage('单击并按住鼠标进行拖动'),
    formatMessage('更改图像'),
    formatMessage('关闭'),
    formatMessage('选择个性化字段'),
    formatMessage('除去'),
    formatMessage('除去图像'),
    ,
    ,
    ,
    formatMessage('选择图像'),
    ,
    formatMessage('保存...')
  ]);
}
const generateZh = memoize(createZh);

function createSv() {
  const formatMessage = genFormatMessage('sv');
  return Object.assign([], generateEn(), [
    formatMessage('Lägg till ett avsnitt'),
    formatMessage('Stäng'),
    formatMessage('Kopiera'),
    formatMessage('Släpp här'),
    formatMessage('Släpp för att överföra'),
    formatMessage('Redigera bild'),
    formatMessage('Lägg till HTML'),
    ,
    formatMessage('Dra och släpp bild, eller [bläddra i bibliotek].'),
    ,
    ,
    formatMessage('Välj en layout eller dra innehåll här'),
    formatMessage('Lås för att förhindra redigering'),
    formatMessage('Klicka och håll för att dra'),
    formatMessage('Ändra bild'),
    formatMessage('Stäng'),
    formatMessage('Välj ett anpassningsfält'),
    formatMessage('Ta bort'),
    formatMessage('Ta bort bild'),
    ,
    ,
    ,
    formatMessage('Välj bild'),
    ,
    formatMessage('Spara ...')
  ]);
}
const generateSv = memoize(createSv);

function createFr() {
  const formatMessage = genFormatMessage('fr');
  return Object.assign([], generateEn(), [
    formatMessage('Ajouter une section'),
    formatMessage('Fermer'),
    formatMessage('Copier'),
    formatMessage('Déposer ici'),
    formatMessage('Déposer pour télécharger'),
    formatMessage("Editer l'image"),
    formatMessage('Ajouter votre HTML'),
    ,
    formatMessage('Glissez-déposez une image ou [parcourez la bibliothèque].'),
    ,
    ,
    formatMessage('Sélectionnez une présentation ou glissez un contenu ici'),
    formatMessage("Verrouiller pour empêcher l'édition"),
    formatMessage('Cliquer et maintenir pour faire glisser'),
    formatMessage("Changer d'image"),
    formatMessage('Fermer'),
    formatMessage('Choisir une zone de personnalisation'),
    formatMessage('Retirer'),
    formatMessage("Retirer l'image"),
    ,
    ,
    ,
    formatMessage('Sélectionner une image'),
    ,
    formatMessage('Sauvegarder...')
  ]);
}
const generateFr = memoize(createFr);

function createZhTw() {
  const formatMessage = genFormatMessage('zh-TW');
  return Object.assign([], generateEn(), [
    formatMessage('新增區段'),
    formatMessage('關閉'),
    formatMessage('複製'),
    formatMessage('放置在這裡'),
    formatMessage('放置以上傳'),
    formatMessage('編輯影像'),
    formatMessage('新增您的 HTML'),
    ,
    formatMessage('拖放影像、或是[瀏覽檔案庫]。'),
    ,
    ,
    formatMessage('在此選取佈置或拖曳內容'),
    formatMessage('鎖定以防止編輯'),
    formatMessage('按住並拖曳'),
    formatMessage('變更影像'),
    formatMessage('關閉'),
    formatMessage('選擇個人化欄位'),
    formatMessage('移除'),
    formatMessage('移除影像'),
    ,
    ,
    ,
    formatMessage('選取影像'),
    ,
    formatMessage('儲存 ...')
  ]);
}
const generateZhTw = memoize(createZhTw);
const NLS_MAP: Record<NLS_LOCALE | string, () => FormatFunction[]> = {
  0: generateDe,
  1: generateEn,
  2: generateEs,
  3: generateFr,
  4: generateIt,
  5: generateJa,
  6: generateKo,
  7: generatePtBr,
  8: generateSv,
  9: generateZh,
  10: generateZhTw,
  de: generateDe,
  it: generateIt,
  en: generateEn,
  ja: generateJa,
  ko: generateKo,
  'pt-BR': generatePtBr,
  es: generateEs,
  zh: generateZh,
  sv: generateSv,
  fr: generateFr,
  'zh-TW': generateZhTw
};
export const NLS: UnaryFunction<NLS_LOCALE | string, FormatFunction[]> = (
  aKey
) => (NLS_MAP[aKey] || generateEn)();
