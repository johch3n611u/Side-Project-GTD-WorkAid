export class EditorConfig {
  public width = '100%';
  public height = '400';
  public path = 'assets/editor.md/lib/'; //你的path路径（原资源文件中lib包在我们项目中所放的位置）
  public codeFold: true;
  public searchReplace = true;
  public toolbar = true;
  public emoji = true;
  public taskList = true;
  public tex = true; // 开启科学公式TeX语言支持，默认关闭
  public readOnly = false;
  public tocm = true;
  public watch = true;
  public previewCodeHighlight = true;
  public saveHTMLToTextarea = true; // 保存 HTML 到 Textarea
  public markdown = '';
  public flowChart = true; // 开启流程图支持，默认关闭
  public syncScrolling = true;
  public sequenceDiagram = true; // 开启时序/序列图支持，默认关闭,
  public imageUpload = true;
  public imageFormats = ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp'];
  public imageUploadURL = '';
}
