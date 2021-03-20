export default function translateErrors(code) {
  const error = { title: 'エラー', description: '時間をおいてお試しください' };
  // ログイン時のエラーメッセージ
  switch (code) {
    case 'auth/invalid-email':
      error.description = 'メールアドレスが不正です。';
      break;
    case 'auth/user-disabled':
      error.description = 'アカウントが無効です';
      break;
    case 'auth/user-not-found':
      error.description = 'ユーザーが見つかりませんでした。';
      break;
    case 'auth/wrong-password':
      error.description = 'パスワードが間違っています。';
      break;
    case 'auth/email-already-in-use':
      error.description = 'メールアドレスが使用されています。';
      break;
    case 'auth/operation-not-allowed':
      error.description = '開発者にお問い合わせください';
      break;
    case 'auth/weak-password':
      error.description = 'パスワードが簡単すぎます。';
      break;
    default:
    // 何もなかった時の処理は何もしないからdefaultの後は何も書かなくていい
  }
  return error;
  // returnについてはhttps://www.sejuku.net/blog/28728を見ろ。今回の場合、returnを使って、errorの(description)値を上書きする
}
