import React, { useState, useEffect } from 'react';
import { 
  Users, 
  MessageSquare, 
  BarChart3, 
  TrendingUp, 
  Heart, 
  X, 
  Minus,
  Plus,
  User,
  Settings,
  Filter,
  Search,
  Target
} from 'lucide-react';

const ConsensusSNS = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('rooms');
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "気候変動対策について",
      content: "炭素税の導入は経済への影響を考慮すべきか？",
      author: "環境派ユーザー",
      cluster: "環境重視派",
      reactions: { agree: 45, disagree: 23, neutral: 12 },
      timestamp: new Date(Date.now() - 3600000),
      room: "環境問題"
    },
    {
      id: 2,
      title: "リモートワークの普及",
      content: "企業のリモートワーク導入は労働生産性を向上させるか？",
      author: "働き方改革派",
      cluster: "効率重視派",
      reactions: { agree: 67, disagree: 15, neutral: 8 },
      timestamp: new Date(Date.now() - 7200000),
      room: "働き方"
    }
  ]);
  
  const [clusters, setClusters] = useState([
    { 
      id: 1, 
      name: "環境重視派", 
      members: 245, 
      color: "#10B981",
      avgScore: 7.2,
      description: "持続可能性と環境保護を重視"
    },
    { 
      id: 2, 
      name: "経済重視派", 
      members: 189, 
      color: "#3B82F6",
      avgScore: 5.8,
      description: "経済成長と効率性を重視"
    },
    { 
      id: 3, 
      name: "バランス派", 
      members: 312, 
      color: "#8B5CF6",
      avgScore: 6.5,
      description: "環境と経済のバランスを重視"
    }
  ]);

  const [rooms] = useState([
    { id: 1, name: "環境問題", participants: 456, topics: 23 },
    { id: 2, name: "働き方", participants: 234, topics: 15 },
    { id: 3, name: "教育制度", participants: 167, topics: 12 },
    { id: 4, name: "社会保障", participants: 289, topics: 18 }
  ]);

  const [newPost, setNewPost] = useState({ title: '', content: '', room: '環境問題' });
  const [showNewPost, setShowNewPost] = useState(false);

  // ユーザー登録のモックデータ
  const [registrationData, setRegistrationData] = useState({
    nickname: '',
    interests: [],
    attributes: { age: '', occupation: '' }
  });

  const handleLogin = () => {
    setCurrentUser({
      id: 1,
      nickname: "統計好きユーザー",
      cluster: "バランス派",
      joinDate: new Date()
    });
  };

  const handleReaction = (postId, reaction) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          reactions: {
            ...post.reactions,
            [reaction]: post.reactions[reaction] + 1
          }
        };
      }
      return post;
    }));
  };

  const addPost = () => {
    if (newPost.title && newPost.content) {
      const post = {
        id: posts.length + 1,
        title: newPost.title,
        content: newPost.content,
        author: currentUser.nickname,
        cluster: currentUser.cluster,
        reactions: { agree: 0, disagree: 0, neutral: 0 },
        timestamp: new Date(),
        room: newPost.room
      };
      setPosts([post, ...posts]);
      setNewPost({ title: '', content: '', room: '環境問題' });
      setShowNewPost(false);
    }
  };

  // ログインしていない場合のログイン画面
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">統計的合意形成SNS</h1>
            <p className="text-gray-600">集団知を活用した新しい意見交換の場</p>
          </div>
          
          <div className="space-y-4">
            <input
              type="text"
              placeholder="ニックネーム"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={registrationData.nickname}
              onChange={(e) => setRegistrationData({...registrationData, nickname: e.target.value})}
            />
            
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="年代"
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                value={registrationData.attributes.age}
                onChange={(e) => setRegistrationData({
                  ...registrationData, 
                  attributes: {...registrationData.attributes, age: e.target.value}
                })}
              />
              <input
                type="text"
                placeholder="職業"
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                value={registrationData.attributes.occupation}
                onChange={(e) => setRegistrationData({
                  ...registrationData,
                  attributes: {...registrationData.attributes, occupation: e.target.value}
                })}
              />
            </div>
            
            <button
              onClick={handleLogin}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              参加する
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-indigo-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">統計的合意形成SNS</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-700">{currentUser.nickname}</span>
                <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                  {currentUser.cluster}
                </span>
              </div>
              <Settings className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* ナビゲーションタブ */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
          {[
            { key: 'rooms', label: 'ディスカッションルーム', icon: MessageSquare },
            { key: 'clusters', label: 'クラスタ分析', icon: Users },
            { key: 'stats', label: '統計・可視化', icon: BarChart3 },
            { key: 'consensus', label: '合意点探索', icon: Target }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === key
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* メインコンテンツ */}
        {activeTab === 'rooms' && (
          <div className="space-y-6">
            {/* 新規投稿ボタン */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">ディスカッションルーム</h2>
              <button
                onClick={() => setShowNewPost(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>新規投稿</span>
              </button>
            </div>

            {/* ルーム一覧 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {rooms.map(room => (
                <div key={room.id} className="bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-2">{room.name}</h3>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{room.participants}人参加</span>
                    <span>{room.topics}件のトピック</span>
                  </div>
                </div>
              ))}
            </div>

            {/* 投稿一覧 */}
            <div className="space-y-4">
              {posts.map(post => (
                <div key={post.id} className="bg-white rounded-lg p-6 shadow-sm border">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                      <p className="text-gray-700 mb-3">{post.content}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{post.author}</span>
                        <span className="px-2 py-1 rounded-full bg-gray-100">{post.cluster}</span>
                        <span>{post.room}</span>
                        <span>{new Date(post.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* リアクションボタン */}
                  <div className="flex items-center space-x-4 pt-4 border-t">
                    <button
                      onClick={() => handleReaction(post.id, 'agree')}
                      className="flex items-center space-x-2 px-3 py-1 rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                    >
                      <Heart className="w-4 h-4" />
                      <span>賛成 {post.reactions.agree}</span>
                    </button>
                    <button
                      onClick={() => handleReaction(post.id, 'disagree')}
                      className="flex items-center space-x-2 px-3 py-1 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span>反対 {post.reactions.disagree}</span>
                    </button>
                    <button
                      onClick={() => handleReaction(post.id, 'neutral')}
                      className="flex items-center space-x-2 px-3 py-1 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                      <span>中立 {post.reactions.neutral}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'clusters' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">クラスタ分析</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {clusters.map(cluster => (
                <div key={cluster.id} className="bg-white rounded-lg p-6 shadow-sm border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold" style={{color: cluster.color}}>
                      {cluster.name}
                    </h3>
                    <div className="text-right">
                      <div className="text-2xl font-bold" style={{color: cluster.color}}>
                        {cluster.avgScore}
                      </div>
                      <div className="text-sm text-gray-500">平均スコア</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{cluster.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{cluster.members}人</span>
                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-full rounded-full"
                        style={{
                          backgroundColor: cluster.color,
                          width: `${(cluster.members / Math.max(...clusters.map(c => c.members))) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">統計・可視化</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">意見分布</h3>
                <div className="space-y-4">
                  {posts.map(post => (
                    <div key={post.id}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">{post.title}</span>
                      </div>
                      <div className="flex space-x-1 h-4 rounded-full overflow-hidden bg-gray-100">
                        <div 
                          className="bg-green-500"
                          style={{width: `${(post.reactions.agree / (post.reactions.agree + post.reactions.disagree + post.reactions.neutral)) * 100}%`}}
                        ></div>
                        <div 
                          className="bg-red-500"
                          style={{width: `${(post.reactions.disagree / (post.reactions.agree + post.reactions.disagree + post.reactions.neutral)) * 100}%`}}
                        ></div>
                        <div 
                          className="bg-gray-400"
                          style={{width: `${(post.reactions.neutral / (post.reactions.agree + post.reactions.disagree + post.reactions.neutral)) * 100}%`}}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">クラスタ間相関</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm">環境重視派 ↔ バランス派</span>
                    <span className="font-semibold text-green-600">0.72</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="text-sm">経済重視派 ↔ バランス派</span>
                    <span className="font-semibold text-yellow-600">0.58</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="text-sm">環境重視派 ↔ 経済重視派</span>
                    <span className="font-semibold text-red-600">0.31</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'consensus' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">合意点探索</h2>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-indigo-600" />
                潜在的合意候補
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-800 mb-2">合意度: 高 (78%)</h4>
                  <p className="text-green-700">
                    "環境保護と経済発展は段階的なアプローチで両立を図るべきである"
                  </p>
                  <div className="mt-2 text-sm text-green-600">
                    支持クラスタ: バランス派(89%), 環境重視派(72%), 経済重視派(65%)
                  </div>
                </div>
                
                <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                  <h4 className="font-semibold text-yellow-800 mb-2">合意度: 中 (62%)</h4>
                  <p className="text-yellow-700">
                    "リモートワークは労働生産性向上に寄与するが、業種別の配慮が必要"
                  </p>
                  <div className="mt-2 text-sm text-yellow-600">
                    支持クラスタ: 効率重視派(78%), バランス派(58%), 環境重視派(52%)
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-800 mb-2">新たな論点</h4>
                  <p className="text-blue-700">
                    "技術革新による環境負荷軽減と雇用への影響のバランス"
                  </p>
                  <div className="mt-2 text-sm text-blue-600">
                    この論点についてさらなる議論が推奨されます
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 新規投稿モーダル */}
      {showNewPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">新規投稿</h3>
            
            <div className="space-y-4">
              <select
                value={newPost.room}
                onChange={(e) => setNewPost({...newPost, room: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                {rooms.map(room => (
                  <option key={room.id} value={room.name}>{room.name}</option>
                ))}
              </select>
              
              <input
                type="text"
                placeholder="投稿タイトル"
                value={newPost.title}
                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
              
              <textarea
                placeholder="内容を入力してください..."
                value={newPost.content}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 h-32"
              />
              
              <div className="flex space-x-3">
                <button
                  onClick={addPost}
                  className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  投稿
                </button>
                <button
                  onClick={() => setShowNewPost(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  キャンセル
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsensusSNS;

