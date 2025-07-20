import React, { useState, useEffect, useCallback, useRef, useMemo, memo } from 'react';
import { Award, Users, Settings, Plus, Filter, Star, Clock, Gift, ChevronRight, X } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const PlatformIcon = ({ platform }) => {
  const iconStyle = "w-4 h-4";
  
  switch (platform) {
    case 'Telegram':
      return (
        <svg viewBox="0 0 24 24" className={iconStyle} fill="currentColor">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" className="fill-cyan-400"/>
        </svg>
      );
      
    case 'VK':
      return (
        <span className="text-blue-500 font-black text-sm" style={{fontWeight: 900}}>VK</span>
      );
      
    case 'YouTube':
      return (
        <svg viewBox="0 0 24 24" className={iconStyle} fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" className="fill-red-500"/>
        </svg>
      );
      
    case 'TikTok':
      return (
        <svg viewBox="0 0 24 24" className={iconStyle} fill="currentColor">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" className="fill-black"/>
        </svg>
      );
      
    default:
      return (
        <svg viewBox="0 0 24 24" className={iconStyle} fill="currentColor">
          <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" className="fill-gray-400"/>
        </svg>
      );
  }
};

const GiveawayApp = () => {
  // Инициализация Supabase
  const supabase = useMemo(() => createClient(
    'https://kochdniwruahksxfiwqj.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvY2hkbml3cnVhaGtzeGZpd3FqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NTM4MDYsImV4cCI6MjA2ODMyOTgwNn0.TOOGjxTZVUKh66tSdlRMQW_KofxVP_lH0eCQn-WiT-o'
  ), []);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .line-clamp-1 {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      
      .line-clamp-2 {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const [currentView, setCurrentView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('user');
  const [currentUserId, setCurrentUserId] = useState(null);
  const [participatingGiveaways, setParticipatingGiveaways] = useState([]);
  const [selectedGiveaway, setSelectedGiveaway] = useState(null);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    dailyActiveUsers: 0,
    weeklyActiveUsers: 0,
    monthlyActiveUsers: 0,
    totalGiveaways: 0,
    totalParticipations: 0,
    uniqueParticipants: 0,
    totalUniqueViews: 0,
    avgViewsPerGiveaway: 0,
    conversionRate: 0
  });
  const [giveawayStats, setGiveawayStats] = useState({});

  const [categories, setCategories] = useState([]);
  const [giveaways, setGiveaways] = useState([]);

  // Функции для работы с базой данных
  const loadCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('id');
      
      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Ошибка загрузки категорий:', error);
    }
  };

  // Функция загрузки аналитики
  const loadAnalytics = async () => {
    try {
      const { data, error } = await supabase
        .rpc('calculate_enhanced_analytics');
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        const stats = data[0];
        setAnalytics({
          totalUsers: stats.total_users || 0,
          dailyActiveUsers: stats.daily_active_users || 0,
          weeklyActiveUsers: stats.weekly_active_users || 0,
          monthlyActiveUsers: stats.monthly_active_users || 0,
          totalGiveaways: stats.total_giveaways || 0,
          totalParticipations: stats.total_participations || 0,
          uniqueParticipants: stats.unique_participants || 0,
          totalUniqueViews: stats.total_unique_views || 0,
          avgViewsPerGiveaway: stats.avg_views_per_giveaway || 0,
          conversionRate: stats.conversion_rate || 0
        });
      }
    } catch (error) {
      console.error('Ошибка загрузки аналитики:', error);
    }
  };

  // Функция загрузки детальной статистики участников
  const loadGiveawayParticipantsStats = async () => {
    try {
      const { data, error } = await supabase
        .from('giveaways')
        .select(`
          id,
          title,
          user_giveaways(
            id,
            participated_at,
            users(name)
          )
        `);
      
      if (error) throw error;
      
      // Формируем статистику по участникам
      const participantsMap = {};
      data?.forEach(giveaway => {
        participantsMap[giveaway.id] = {
          title: giveaway.title,
          totalParticipants: giveaway.user_giveaways?.length || 0,
          participants: giveaway.user_giveaways?.map(participation => ({
            userName: participation.users?.name || 'Неизвестный пользователь',
            participatedAt: participation.participated_at
          })) || [],
          recentParticipations: giveaway.user_giveaways?.filter(p => {
            const participationDate = new Date(p.participated_at);
            const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
            return participationDate >= weekAgo;
          }).length || 0
        };
      });
      
      setGiveawayStats(participantsMap);
    } catch (error) {
      console.error('Ошибка загрузки статистики участников:', error);
    }
  };

  // Функция загрузки статистики розыгрышей
  const loadGiveawayStats = async () => {
    // Загружаем детальную статистику участников
    await loadGiveawayParticipantsStats();
  };

  // Функция обновления активности пользователя
  const updateUserActivity = async (userId) => {
    try {
      await supabase.rpc('update_user_activity', { p_user_id: userId });
    } catch (error) {
      console.error('Ошибка обновления активности:', error);
    }
  };

  // Функция записи просмотра розыгрыша
  const recordGiveawayView = async (giveawayId, userId = null) => {
    try {
      const sessionId = userId ? null : `session_${Date.now()}_${Math.random()}`;
      await supabase.rpc('record_giveaway_view', {
        p_giveaway_id: giveawayId,
        p_user_id: userId,
        p_session_id: sessionId
      });
    } catch (error) {
      console.error('Ошибка записи просмотра:', error);
    }
  };

  // Функция для отладки - удаление участия пользователя
  const removeUserParticipation = async (userId, giveawayId) => {
    try {
      const { error } = await supabase
        .from('user_giveaways')
        .delete()
        .eq('user_id', userId)
        .eq('giveaway_id', giveawayId);
      
      if (error) throw error;
      
      // Перезагружаем данные
      await Promise.all([
        loadGiveaways(),
        loadUserParticipations(userId),
        loadAnalytics(),
        loadGiveawayStats()
      ]);
      
      return { success: true };
    } catch (error) {
      console.error('Ошибка удаления участия:', error);
      return { success: false, error: error.message };
    }
  };

  const loadGiveaways = async () => {
    try {
      const { data, error } = await supabase
        .from('giveaways')
        .select(`
          *,
          categories(name, icon, color),
          user_giveaways(id)
        `)
        .order('is_vip', { ascending: false })
        .order('id');
      
      if (error) throw error;
      
      const formattedGiveaways = data?.map(giveaway => {
        console.log('Загружен розыгрыш:', {
          id: giveaway.id,
          title: giveaway.title,
          prizeImageUrl: giveaway.prize_image_url,
          hasImage: !!giveaway.prize_image_url
        });
        
        return {
          id: giveaway.id,
          title: giveaway.title,
          category: giveaway.category_id,
          participants: giveaway.user_giveaways?.length || 0, // Реальное количество участников
          timeLeft: giveaway.time_left,
          platform: giveaway.platform,
          prize: giveaway.prize,
          image: giveaway.image, // Эмодзи как fallback
          prizeImageUrl: giveaway.prize_image_url, // URL загруженного изображения
          views: giveaway.views || 0, // Реальные просмотры из базы
          uniqueViews: giveaway.unique_views || 0, // Реальные уникальные просмотры из базы
          createdAt: giveaway.created_at,
          description: giveaway.description,
          conditions: giveaway.conditions,
          endDate: giveaway.end_date,
          isVip: giveaway.is_vip,
          url: giveaway.url
        };
      }) || [];
      
      setGiveaways(formattedGiveaways);
    } catch (error) {
      console.error('Ошибка загрузки розыгрышей:', error);
    }
  };

  const loadUserParticipations = async (userId) => {
    try {
      console.log('Загружаем участия для пользователя:', userId);
      
      const { data, error } = await supabase
        .from('user_giveaways')
        .select('giveaway_id, participated_at, giveaways(title)')
        .eq('user_id', userId)
        .order('participated_at', { ascending: false });
      
      if (error) {
        console.error('Ошибка при загрузке участий:', error);
        throw error;
      }
      
      console.log('Загруженные участия:', data);
      
      const giveawayIds = data?.map(item => item.giveaway_id) || [];
      console.log('ID розыгрышей для участия:', giveawayIds);
      
      setParticipatingGiveaways(giveawayIds);
    } catch (error) {
      console.error('Ошибка загрузки участий:', error);
      // В случае ошибки устанавливаем пустой массив
      setParticipatingGiveaways([]);
    }
  };

  // Функция сохранения состояния аутентификации в localStorage
  const saveAuthState = (user) => {
    try {
      const authData = {
        isRegistered: true,
        userName: user.name,
        userRole: user.role,
        currentUserId: user.id,
        loginTime: Date.now()
      };
      localStorage.setItem('giveawayApp_auth', JSON.stringify(authData));
    } catch (error) {
      console.error('Ошибка сохранения состояния аутентификации:', error);
    }
  };

  // Функция загрузки состояния аутентификации из localStorage
  const loadAuthState = async () => {
    try {
      const savedAuth = localStorage.getItem('giveawayApp_auth');
      if (savedAuth) {
        const authData = JSON.parse(savedAuth);
        
        // Проверяем, что данные не слишком старые (например, не старше 30 дней)
        const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
        if (Date.now() - authData.loginTime < thirtyDaysInMs) {
          setIsRegistered(authData.isRegistered);
          setUserName(authData.userName);
          setUserRole(authData.userRole);
          setCurrentUserId(authData.currentUserId);
          
          // Устанавливаем пользователя в сессии для работы с RLS
          await setCurrentUser(authData.currentUserId);
          
          // Загружаем участия пользователя
          await loadUserParticipations(authData.currentUserId);
          
          // Обновляем активность пользователя
          await updateUserActivity(authData.currentUserId);
          
          return true;
        } else {
          // Удаляем старые данные
          localStorage.removeItem('giveawayApp_auth');
        }
      }
    } catch (error) {
      console.error('Ошибка загрузки состояния аутентификации:', error);
      localStorage.removeItem('giveawayApp_auth');
    }
    return false;
  };

  // Функция очистки состояния аутентификации
  const clearAuthState = () => {
    try {
      localStorage.removeItem('giveawayApp_auth');
    } catch (error) {
      console.error('Ошибка очистки состояния аутентификации:', error);
    }
  };

  // Функция установки ID текущего пользователя в сессии
  const setCurrentUser = async (userId) => {
    try {
      await supabase.rpc('set_config', {
        setting_name: 'app.current_user_id',
        new_value: userId,
        is_local: false
      });
    } catch (error) {
      console.error('Ошибка установки пользователя в сессии:', error);
    }
  };

  // Функция регистрации пользователя с проверкой согласия на конфиденциальность
  const registerUser = async (name, email, password, privacyAgreed = false) => {
    try {
      // Проверяем согласие с правилами конфиденциальности
      if (!privacyAgreed) {
        return { success: false, error: 'Необходимо согласиться с правилами конфиденциальности' };
      }
      
      // Хешируем пароль (в реальном приложении используйте bcrypt)
      const passwordHash = btoa(password); // Простое base64 кодирование для демо
      
      // Используем безопасную функцию регистрации
      const { data, error } = await supabase
        .rpc('register_user_with_privacy', {
          p_name: name,
          p_email: email,
          p_password_hash: passwordHash,
          p_privacy_agreed: privacyAgreed,
          p_privacy_policy_version: '1.0'
        });
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        const result = data[0];
        
        if (result.success) {
          // Получаем данные созданного пользователя
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', result.user_id)
            .single();
          
          if (userError) throw userError;
          
          // Устанавливаем пользователя в сессии для работы с RLS
          await setCurrentUser(userData.id);
          
          // Обновляем активность пользователя
          await updateUserActivity(userData.id);
          
          // Сохраняем состояние аутентификации
          saveAuthState(userData);
          
          return { success: true, user: userData };
        } else {
          return { success: false, error: result.message };
        }
      }
      
      return { success: false, error: 'Неизвестная ошибка при регистрации' };
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      return { success: false, error: error.message };
    }
  };

  // Функция входа пользователя
  const loginUser = async (email, password) => {
    try {
      const passwordHash = btoa(password);
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('password_hash', passwordHash)
        .single();
      
      if (error) throw error;
      
      // Устанавливаем пользователя в сессии для работы с RLS
      await setCurrentUser(data.id);
      
      // Обновляем активность пользователя
      await updateUserActivity(data.id);
      
      // Сохраняем состояние аутентификации
      saveAuthState(data);
      
      return { success: true, user: data };
    } catch (error) {
      console.error('Ошибка входа:', error);
      return { success: false, error: 'Неверный email или пароль' };
    }
  };

  // Функция добавления категории
  const addCategoryToDb = async (name, icon) => {
    try {
      const colors = ['from-blue-500 to-cyan-500', 'from-purple-500 to-pink-500', 'from-green-500 to-teal-500', 'from-orange-500 to-red-500'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      const { data, error } = await supabase
        .from('categories')
        .insert([{ name, icon, color }])
        .select()
        .single();
      
      if (error) throw error;
      
      await loadCategories();
      return { success: true, category: data };
    } catch (error) {
      console.error('Ошибка добавления категории:', error);
      return { success: false, error: error.message };
    }
  };

  // Функция сжатия изображения
  const compressImage = (file, maxWidth = 800, quality = 0.7) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Вычисляем новые размеры с сохранением пропорций
        let { width, height } = img;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Рисуем сжатое изображение
        ctx.drawImage(img, 0, 0, width, height);
        
        // Конвертируем в blob
        canvas.toBlob(resolve, 'image/jpeg', quality);
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  // Функция загрузки изображения в Supabase Storage
  const uploadPrizeImage = async (file) => {
    try {
      console.log('Начинаем загрузку файла:', file.name, file.size);
      
      // Проверяем размер файла и сжимаем при необходимости
      let fileToUpload = file;
      if (file.size > 1024 * 1024) { // Если больше 1MB
        console.log('Файл слишком большой, сжимаем...');
        fileToUpload = await compressImage(file, 800, 0.7);
        console.log('Файл сжат до:', fileToUpload.size);
      }
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = fileName;

      console.log('Путь к файлу:', filePath);

      // Пытаемся создать bucket через API если его нет
      try {
        const { data: newBucket, error: createError } = await supabase.storage
          .createBucket('prize-images', { 
            public: true,
            allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
            fileSizeLimit: 10485760 // 10MB
          });
        
        if (createError && !createError.message.includes('already exists')) {
          console.log('Не удалось создать bucket через API:', createError.message);
        } else {
          console.log('Bucket создан или уже существует');
        }
      } catch (bucketError) {
        console.log('Ошибка при создании bucket:', bucketError.message);
      }

      // Загружаем файл напрямую, игнорируя проверки bucket
      const { data, error } = await supabase.storage
        .from('prize-images')
        .upload(filePath, fileToUpload, {
          cacheControl: '3600',
          upsert: false,
          duplex: 'half' // Добавляем для совместимости с новыми версиями
        });

      if (error) {
        console.error('Ошибка загрузки в storage:', error);
        
        // Если ошибка RLS, пробуем альтернативный способ загрузки
        if (error.message.includes('row-level security') || 
            error.message.includes('RLS') || 
            error.message.includes('policies')) {
          
          console.log('Проблема с RLS/политиками, используем альтернативный способ...');
          
          // Создаем blob URL для локального использования
          const blobUrl = URL.createObjectURL(fileToUpload);
          console.log('Создан локальный blob URL:', blobUrl);
          
          return { 
            success: true, 
            url: blobUrl, 
            isLocal: true,
            warning: 'Изображение сохранено локально из-за проблем с облачным хранилищем'
          };
        }
        
        throw error;
      }

      console.log('Файл загружен успешно:', data);

      // Получаем публичный URL
      const { data: { publicUrl } } = supabase.storage
        .from('prize-images')
        .getPublicUrl(filePath);

      console.log('Публичный URL:', publicUrl);

      return { success: true, url: publicUrl, isLocal: false };
    } catch (error) {
      console.error('Ошибка загрузки изображения:', error);
      
      // Как последняя попытка, создаем локальный blob URL
      try {
        const blobUrl = URL.createObjectURL(file);
        console.log('Использован fallback blob URL');
        
        return { 
          success: true, 
          url: blobUrl, 
          isLocal: true,
          warning: 'Изображение сохранено локально из-за проблем с облачным хранилищем'
        };
      } catch (fallbackError) {
        console.error('Ошибка создания blob URL:', fallbackError);
        return { success: false, error: `Критическая ошибка загрузки: ${error.message}` };
      }
    }
  };

  // Функция добавления розыгрыша
  const addGiveawayToDb = async (giveawayData) => {
    try {
      let prizeImageUrl = null;
      let imageWarning = '';
      
      // Загружаем изображение, если оно есть
      if (giveawayData.prizeImage) {
        console.log('Загружаем изображение для розыгрыша...');
        const uploadResult = await uploadPrizeImage(giveawayData.prizeImage);
        if (uploadResult.success) {
          prizeImageUrl = uploadResult.url;
          console.log('Изображение загружено:', prizeImageUrl);
          
          if (uploadResult.isLocal) {
            imageWarning = uploadResult.warning || 'Изображение сохранено локально';
          }
        } else {
          console.error('Ошибка загрузки изображения:', uploadResult.error);
          alert('Предупреждение: не удалось загрузить изображение. Розыгрыш будет создан без изображения. Ошибка: ' + uploadResult.error);
        }
      }

      // Используем безопасную функцию для добавления розыгрыша
      const { data, error } = await supabase.rpc('add_giveaway_with_image', {
        p_title: giveawayData.title,
        p_prize: giveawayData.prize,
        p_description: giveawayData.description,
        p_conditions: giveawayData.conditions,
        p_category_id: giveawayData.category,
        p_platform: giveawayData.platform,
        p_url: giveawayData.url,
        p_prize_image_url: prizeImageUrl,
        p_is_vip: giveawayData.isVip
      });
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        const result = data[0];
        
        if (result.success) {
          await loadGiveaways();
          await loadAnalytics(); // Обновляем аналитику
          
          // Показываем предупреждение о локальном сохранении изображения
          if (imageWarning) {
            alert('Розыгрыш создан успешно! ' + imageWarning + '. Для полного функционирования рекомендуется настроить Supabase Storage.');
          }
          
          return { success: true, giveaway: { id: result.giveaway_id } };
        } else {
          return { success: false, error: result.message };
        }
      }
      
      return { success: false, error: 'Неизвестная ошибка при создании розыгрыша' };
    } catch (error) {
      console.error('Ошибка добавления розыгрыша:', error);
      return { success: false, error: error.message };
    }
  };

  // Функция участия в розыгрыше
  const participateInGiveaway = async (userId, giveawayId) => {
    try {
      console.log('Попытка участия:', { userId, giveawayId });
      
      // Используем безопасную функцию из базы данных
      const { data, error } = await supabase
        .rpc('safe_participate_in_giveaway', {
          p_user_id: userId,
          p_giveaway_id: giveawayId
        });
      
      if (error) {
        console.error('Ошибка RPC:', error);
        throw error;
      }
      
      console.log('Результат RPC:', data);
      
      if (data && data.length > 0) {
        const result = data[0];
        
        if (result.success) {
          console.log('Участие успешно добавлено');
          
          // Перезагружаем данные для обновления счетчиков
          await Promise.all([
            loadGiveaways(),
            loadUserParticipations(userId),
            loadAnalytics(),
            loadGiveawayStats()
          ]);
          
          return { success: true };
        } else {
          console.log('Участие не добавлено:', result.message);
          return { success: false, error: result.message };
        }
      }
      
      return { success: false, error: 'Неизвестная ошибка' };
    } catch (error) {
      console.error('Ошибка участия в розыгрыше:', error);
      return { success: false, error: error.message };
    }
  };

  // Загрузка данных при запуске
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      
      // Сначала загружаем основные данные
      await Promise.all([
        loadCategories(),
        loadGiveaways()
      ]);
      
      // Затем пытаемся восстановить состояние аутентификации
      const wasLoggedIn = await loadAuthState();
      
      // Загружаем аналитику всегда, но особенно для админов
      await Promise.all([
        loadAnalytics(),
        loadGiveawayStats()
      ]);
      
      setLoading(false);
    };
    
    loadInitialData();
  }, [supabase]);

  const sortedGiveaways = [...giveaways].sort((a, b) => {
    if (a.isVip === true && b.isVip === false) return -1;
    if (a.isVip === false && b.isVip === true) return 1;
    return a.id - b.id;
  });

  const filteredGiveaways = useMemo(() => {
    return selectedCategory 
      ? sortedGiveaways.filter(g => g.category === selectedCategory)
      : sortedGiveaways;
  }, [sortedGiveaways, selectedCategory]);

  const Navigation = () => (
    <nav className="bg-gray-900/50 backdrop-blur-lg border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setCurrentView('home')}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
            >
              <Gift className="h-8 w-8 text-cyan-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                PrizeHub
              </span>
            </button>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => setCurrentView('home')}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                currentView === 'home' 
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              Главная
            </button>
            <button 
              onClick={() => setCurrentView('categories')}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                currentView === 'categories' 
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              Категории
            </button>
            {isRegistered && (
              <button 
                onClick={async () => {
                  setCurrentView('profile');
                  // Если это админ, обновляем аналитику
                  if (userRole === 'admin') {
                    await Promise.all([
                      loadAnalytics(),
                      loadGiveawayStats()
                    ]);
                  }
                }}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentView === 'profile' 
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                {userRole === 'admin' ? 'Админ-панель' : 'Профиль'}
              </button>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {!isRegistered ? (
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setCurrentView('login')}
                  className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800/50 transition-all duration-200"
                >
                  Войти
                </button>
                <button 
                  onClick={() => setCurrentView('register')}
                  className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105"
                >
                  Регистрация
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setCurrentView('profile')}
                className="flex items-center space-x-2 hover:bg-gray-800/50 rounded-lg px-3 py-2 transition-all duration-200"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  userRole === 'admin' 
                    ? 'bg-gradient-to-r from-orange-500 to-red-500' 
                    : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                }`}>
                  <span className="text-white font-bold text-sm">
                    {userName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-gray-300">{userName}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );

  const HomePage = () => (
    <div className="space-y-8">
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          Лучшие розыгрыши в одном месте
        </h1>
        <p className="text-lg text-gray-400 mb-6 max-w-2xl mx-auto">
          Участвуйте в розыгрышах из Telegram, VK, YouTube, TikTok и других платформ
        </p>
        <div className="flex justify-center space-x-4">
          <button 
            onClick={() => setCurrentView('categories')}
            className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 text-sm"
          >
            Начать участие
          </button>
          <button 
            onClick={() => setShowRulesModal(true)}
            className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            ⚖️ Правила
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="relative">
          <button
            onClick={() => setShowCategoryMenu(!showCategoryMenu)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-700/50 transition-all duration-200"
          >
            <Filter className="h-4 w-4" />
            <span>
              {selectedCategory 
                ? categories.find(c => c.id === selectedCategory)?.name 
                : 'Все категории'
              }
            </span>
            <ChevronRight className={`h-4 w-4 transition-transform ${showCategoryMenu ? 'rotate-90' : ''}`} />
          </button>
          
          {showCategoryMenu && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10">
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setShowCategoryMenu(false);
                }}
                className="w-full px-4 py-3 text-left text-gray-300 hover:bg-gray-700/50 transition-colors border-b border-gray-700 last:border-b-0"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">🎁</span>
                  <div>
                    <div className="font-medium">Все категории</div>
                    <div className="text-xs text-gray-400">{giveaways.length} розыгрышей</div>
                  </div>
                </div>
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setShowCategoryMenu(false);
                  }}
                  className="w-full px-4 py-3 text-left text-gray-300 hover:bg-gray-700/50 transition-colors border-b border-gray-700 last:border-b-0"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{category.icon}</span>
                    <div>
                      <div className="font-medium">{category.name}</div>
                      <div className="text-xs text-gray-400">
                        {giveaways.filter(g => g.category === category.id).length} розыгрышей
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {selectedCategory && (
            <button 
              onClick={() => setSelectedCategory(null)}
              className="px-3 py-1 text-sm bg-gray-700/50 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-600/50 transition-colors"
            >
              Сбросить категорию
            </button>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6">
          {selectedCategory 
            ? `${categories.find(c => c.id === selectedCategory)?.name} - Розыгрыши`
            : 'Популярные розыгрыши'
          }
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {filteredGiveaways.length > 0 ? (
            filteredGiveaways.slice(0, 10).map((giveaway) => (
              <GiveawayCard key={giveaway.id} giveaway={giveaway} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-6xl mb-4">📁</div>
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                Нет розыгрышей в выбранной категории
              </h3>
              <p className="text-gray-500 mb-4">
                Попробуйте выбрать другую категорию или посмотрите все розыгрыши
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Показать все розыгрыши
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const GiveawayCard = memo(({ giveaway }) => (
    <div 
      onClick={async () => {
        console.log('Клик по розыгрышу:', {
          giveawayId: giveaway.id,
          currentUserId: currentUserId,
          title: giveaway.title
        });
        
        // Записываем просмотр розыгрыша (только уникальные)
        await recordGiveawayView(giveaway.id, currentUserId);
        
        setSelectedGiveaway(giveaway);
      }}
      className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl overflow-hidden hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
    >
      {/* Изображение призы - большое и привлекательное */}
      <div className="relative h-32 bg-gradient-to-br from-gray-700/50 to-gray-800/50 flex items-center justify-center overflow-hidden">
        {giveaway.prizeImageUrl ? (
          <img 
            src={giveaway.prizeImageUrl} 
            alt={giveaway.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback к эмодзи при ошибке загрузки
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div 
          className="w-full h-full flex items-center justify-center text-6xl" 
          style={{ display: giveaway.prizeImageUrl ? 'none' : 'flex' }}
        >
          {giveaway.image}
        </div>
        
        {/* VIP бейдж */}
        {giveaway.isVip && (
          <div className="absolute top-2 right-2 flex items-center space-x-1 bg-yellow-400/90 text-gray-900 px-2 py-1 rounded-full text-xs font-bold">
            <Star className="h-3 w-3 fill-current" />
            <span>VIP</span>
          </div>
        )}
        
        {/* Градиентный оверлей снизу */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-800/50 to-transparent"></div>
      </div>
      
      {/* Контент карточки */}
      <div className="p-4 space-y-3">
        {/* Заголовок и описание */}
        <div className="text-center">
          <h3 className="text-sm font-bold text-white mb-1 line-clamp-2 leading-tight">{giveaway.title}</h3>
          <p className="text-gray-400 text-xs line-clamp-1">{giveaway.prize}</p>
        </div>
        
        {/* Время */}
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-1 bg-gray-700/50 px-3 py-1 rounded-full">
            <Clock className="h-3 w-3 text-orange-400" />
            <span className="text-xs text-orange-400 font-medium">{giveaway.timeLeft}</span>
          </div>
        </div>
        
        {/* Платформа */}
        <div className="flex justify-center">
          <div className="flex items-center space-x-2 bg-gray-700/50 px-3 py-1 rounded-full">
            <PlatformIcon platform={giveaway.platform} />
            <span className="text-gray-300 text-xs font-medium">{giveaway.platform}</span>
          </div>
        </div>
      </div>
    </div>
  ));

  const CategoriesPage = () => (
    <div className="space-y-8">
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Выберите категорию
        </h1>
        <p className="text-xl text-gray-400">
          Найдите розыгрыши по интересующим вас категориям
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => {
              setSelectedCategory(category.id);
              setCurrentView('giveaways');
            }}
            className={`p-8 rounded-xl bg-gradient-to-r ${category.color} bg-opacity-10 border border-gray-700 hover:border-gray-600 transition-all duration-200 transform hover:scale-105 cursor-pointer`}
          >
            <div className="text-6xl mb-4 text-center">{category.icon}</div>
            <h3 className="text-2xl font-bold text-white text-center mb-2">{category.name}</h3>
            <p className="text-gray-200 text-center mb-4">
              {giveaways.filter(g => g.category === category.id).length} активных розыгрышей
            </p>
            <div className="flex justify-center">
              <ChevronRight className="h-6 w-6 text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const GiveawaysPage = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">
          {selectedCategory 
            ? categories.find(c => c.id === selectedCategory)?.name 
            : 'Все розыгрыши'
          }
        </h1>
        <div className="flex items-center space-x-2">
          {selectedCategory && (
            <button 
              onClick={() => setSelectedCategory(null)}
              className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-700/50 transition-all duration-200"
            >
              Сбросить категорию
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {filteredGiveaways.length > 0 ? (
          filteredGiveaways.map((giveaway) => (
            <GiveawayCard key={giveaway.id} giveaway={giveaway} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              {selectedCategory
                ? 'Нет розыгрышей в выбранной категории'
                : 'Нет доступных розыгрышей'
              }
            </h3>
            <p className="text-gray-500 mb-4">
              {selectedCategory
                ? 'Попробуйте выбрать другую категорию'
                : 'Попробуйте вернуться позже'
              }
            </p>
            <div className="flex justify-center">
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Показать все розыгрыши
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const RegisterPage = () => {
    const [localUserName, setLocalUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [privacyAgreed, setPrivacyAgreed] = useState(false);

    const handleRegister = async () => {
      setError('');
      
      if (!localUserName.trim()) {
        setError('Введите имя пользователя');
        return;
      }
      
      if (!email.trim()) {
        setError('Введите email');
        return;
      }
      
      if (!password.trim()) {
        setError('Введите пароль');
        return;
      }
      
      if (password !== confirmPassword) {
        setError('Пароли не совпадают');
        return;
      }
      
      if (password.length < 6) {
        setError('Пароль должен содержать минимум 6 символов');
        return;
      }
      
      if (!privacyAgreed) {
        setError('Необходимо согласиться с правилами конфиденциальности');
        return;
      }
      
      // Регистрируем пользователя с проверкой согласия на конфиденциальность
      const result = await registerUser(localUserName, email, password, privacyAgreed);
      
      if (!result.success) {
        if (result.error.includes('duplicate') || result.error.includes('unique')) {
          setError('Пользователь с таким email уже существует');
        } else {
          setError('Ошибка регистрации: ' + result.error);
        }
        return;
      }
      
      setUserName(result.user.name);
      setUserRole(result.user.role);
      setCurrentUserId(result.user.id);
      setParticipatingGiveaways([]);
      setIsRegistered(true);
      
      // Загружаем участия пользователя и аналитику
      await Promise.all([
        loadUserParticipations(result.user.id),
        loadAnalytics(),
        loadGiveawayStats()
      ]);
      
      setCurrentView('home');
    };

    return (
      <div className="max-w-md mx-auto mt-16">
        <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Регистрация</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Имя пользователя
              </label>
              <input
                type="text"
                value={localUserName}
                onChange={(e) => setLocalUserName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                placeholder="Введите ваше имя"
                autoComplete="name"
                autoCapitalize="words"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                placeholder="example@email.com"
                autoComplete="email"
                inputMode="email"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Пароль
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                placeholder="Минимум 6 символов"
                autoComplete="new-password"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Подтвердите пароль
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                placeholder="Повторите пароль"
                autoComplete="new-password"
              />
            </div>
            
            <div className="bg-gray-700/30 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="privacyAgreement"
                  checked={privacyAgreed}
                  onChange={(e) => setPrivacyAgreed(e.target.checked)}
                  className="w-4 h-4 text-cyan-500 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500 focus:ring-2 mt-1"
                  required
                />
                <label htmlFor="privacyAgreement" className="text-sm text-gray-300 cursor-pointer leading-relaxed">
                  Я ознакомлен(а) и согласен(на) с{' '}
                  <button
                    type="button"
                    onClick={() => setShowPrivacyModal(true)}
                    className="text-cyan-400 hover:text-cyan-300 underline transition-colors"
                  >
                    правилами конфиденциальности
                  </button>
                  {' '}и обработкой персональных данных
                </label>
              </div>
              {!privacyAgreed && (
                <p className="text-xs text-red-400 mt-2 ml-7">
                  Согласие с правилами конфиденциальности обязательно для регистрации
                </p>
              )}
            </div>
            
            <button 
              onClick={handleRegister}
              disabled={!privacyAgreed}
              className={`w-full px-6 py-3 rounded-lg transition-all duration-200 transform ${
                privacyAgreed 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 hover:scale-105' 
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              Зарегистрироваться
            </button>
            
            <div className="text-center">
              <button 
                onClick={() => setCurrentView('login')}
                className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
              >
                Уже есть аккаунт? Войти
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
      setError('');
      
      if (!email.trim()) {
        setError('Введите email');
        return;
      }
      
      if (!password.trim()) {
        setError('Введите пароль');
        return;
      }
      
      const result = await loginUser(email, password);
      
      if (!result.success) {
        setError(result.error);
        return;
      }
      
      setUserName(result.user.name);
      setUserRole(result.user.role);
      setCurrentUserId(result.user.id);
      setIsRegistered(true);
      
      // Загружаем участия пользователя
      await loadUserParticipations(result.user.id);
      
      // Загружаем аналитику для всех пользователей (особенно важно для админов)
      await Promise.all([
        loadAnalytics(),
        loadGiveawayStats()
      ]);
      
      setCurrentView('home');
    };

    return (
      <div className="max-w-md mx-auto mt-16">
        <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Вход в аккаунт</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                placeholder="example@email.com"
                autoComplete="email"
                inputMode="email"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Пароль
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                placeholder="Введите пароль"
                autoComplete="current-password"
              />
            </div>
            
            <button 
              onClick={handleLogin}
              className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105"
            >
              Войти
            </button>
            
            <div className="text-center">
              <button 
                onClick={() => setCurrentView('register')}
                className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
              >
                Нет аккаунта? Зарегистрироваться
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const UserProfile = () => {
    const [localUserName, setLocalUserName] = useState(userName);

    const handleSaveProfile = () => {
      if (localUserName.trim()) {
        setUserName(localUserName);
      }
    };

    return (
      <div className="space-y-8">
        <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{userName}</h2>
              <p className="text-gray-400">Пользователь</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Никнейм
              </label>
              <input
                type="text"
                value={localUserName}
                onChange={(e) => setLocalUserName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                placeholder="Введите ваш никнейм"
                autoComplete="name"
                autoCapitalize="words"
              />
            </div>
            
            <div className="flex space-x-4">
              <button 
                onClick={handleSaveProfile}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-200"
              >
                Сохранить изменения
              </button>
              <button 
                onClick={() => {
                  const currentUser = registeredUsers.find(u => u.name === userName);
                  if (currentUser) {
                    setRegisteredUsers(registeredUsers.map(u => 
                      u.id === currentUser.id 
                        ? { ...u, participatingGiveaways: participatingGiveaways }
                        : u
                    ));
                  }
                  
                  // Очищаем состояние аутентификации
                  clearAuthState();
                  
                  setIsRegistered(false);
                  setUserName('');
                  setUserRole('user');
                  setCurrentUserId(null);
                  setParticipatingGiveaways([]);
                  setCurrentView('home');
                }}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200"
              >
                Выйти из аккаунта
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Мои розыгрыши</h3>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => loadUserParticipations(currentUserId)}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
              >
                Обновить
              </button>
              <button 
                onClick={async () => {
                  console.log('Текущий пользователь:', currentUserId);
                  console.log('Участвующие розыгрыши:', participatingGiveaways);
                  
                  // Проверяем данные в базе
                  const { data, error } = await supabase
                    .from('user_giveaways')
                    .select('*')
                    .eq('user_id', currentUserId);
                  
                  console.log('Данные из базы:', data);
                  if (error) console.error('Ошибка:', error);
                }}
                className="px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600"
              >
                Отладка
              </button>
            </div>
          </div>
          
          <div className="mb-4 p-3 bg-gray-700/30 rounded-lg">
            <p className="text-sm text-gray-400">
              ID пользователя: <span className="text-cyan-400">{currentUserId}</span>
            </p>
            <p className="text-sm text-gray-400">
              Участий найдено: <span className="text-cyan-400">{participatingGiveaways.length}</span>
            </p>
            {participatingGiveaways.length > 0 && (
              <p className="text-sm text-gray-400">
                ID розыгрышей: <span className="text-cyan-400">{participatingGiveaways.join(', ')}</span>
              </p>
            )}
          </div>
          
          {participatingGiveaways.length === 0 ? (
            <div className="text-center py-8">
              <Gift className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">Вы пока не участвуете в розыгрышах</p>
              <button 
                onClick={() => setCurrentView('home')}
                className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-200"
              >
                Найти розыгрыши
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {giveaways.filter(g => participatingGiveaways.includes(g.id)).map((giveaway) => (
                <div key={giveaway.id} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 flex items-center justify-center">
                      {giveaway.prizeImageUrl ? (
                        <img 
                          src={giveaway.prizeImageUrl} 
                          alt={giveaway.title}
                          className="w-12 h-12 object-cover rounded-lg"
                          onError={(e) => {
                            // Fallback к эмодзи при ошибке загрузки
                            e.target.style.display = 'none';
                            e.target.nextElementSibling.style.display = 'block';
                          }}
                        />
                      ) : null}
                      <div 
                        className="text-2xl" 
                        style={{ display: giveaway.prizeImageUrl ? 'none' : 'block' }}
                      >
                        {giveaway.image}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{giveaway.title}</h4>
                      <p className="text-sm text-gray-400">{giveaway.prize}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-cyan-400">{giveaway.timeLeft}</p>
                    <div className="flex items-center space-x-1 justify-end">
                      <PlatformIcon platform={giveaway.platform} />
                      <p className="text-xs text-gray-400">{giveaway.platform}</p>
                    </div>
                    <button 
                      onClick={async () => {
                        await removeUserParticipation(currentUserId, giveaway.id);
                      }}
                      className="mt-1 px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                    >
                      Удалить участие
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const AdminProfile = () => {
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryIcon, setNewCategoryIcon] = useState('');
    const [newGiveawayTitle, setNewGiveawayTitle] = useState('');
    const [newGiveawayPrize, setNewGiveawayPrize] = useState('');
    const [newGiveawayDescription, setNewGiveawayDescription] = useState('');
    const [newGiveawayConditions, setNewGiveawayConditions] = useState('');
    const [newGiveawayCategory, setNewGiveawayCategory] = useState(1);
    const [newGiveawayPlatform, setNewGiveawayPlatform] = useState('');
    const [newGiveawayUrl, setNewGiveawayUrl] = useState('');
    const [newGiveawayIsVip, setNewGiveawayIsVip] = useState(false);
    const [newGiveawayPrizeImage, setNewGiveawayPrizeImage] = useState(null);
    const [prizeImagePreview, setPrizeImagePreview] = useState(null);
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [showCreateCategory, setShowCreateCategory] = useState(false);
    const [showCreateGiveaway, setShowCreateGiveaway] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [editingGiveaway, setEditingGiveaway] = useState(null);

    const handlePrizeImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        // Проверяем тип файла
        if (!file.type.startsWith('image/')) {
          alert('Пожалуйста, выберите файл изображения');
          return;
        }
        
        // Проверяем размер файла (максимум 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert('Размер файла не должен превышать 5MB');
          return;
        }
        
        setNewGiveawayPrizeImage(file);
        
        // Создаем превью
        const reader = new FileReader();
        reader.onload = (e) => setPrizeImagePreview(e.target.result);
        reader.readAsDataURL(file);
      }
    };

    const clearPrizeImage = () => {
      setNewGiveawayPrizeImage(null);
      setPrizeImagePreview(null);
      // Очищаем input
      const input = document.getElementById('prize-image-input');
      if (input) input.value = '';
    };

    const addCategory = async () => {
      if (newCategoryName.trim() && newCategoryIcon.trim()) {
        const result = await addCategoryToDb(newCategoryName, newCategoryIcon);
        
        if (result.success) {
          setNewCategoryName('');
          setNewCategoryIcon('');
          setShowCreateCategory(false);
        } else {
          console.error('Ошибка создания категории:', result.error);
        }
      }
    };

    const addGiveaway = async () => {
      if (newGiveawayTitle.trim() && newGiveawayPrize.trim() && newGiveawayPlatform.trim() && newGiveawayUrl.trim()) {
        setIsUploadingImage(true);
        
        const giveawayData = {
          title: newGiveawayTitle,
          category: newGiveawayCategory,
          platform: newGiveawayPlatform,
          prize: newGiveawayPrize,
          description: newGiveawayDescription || 'Описание приза не указано',
          conditions: newGiveawayConditions || 'Условия участия не указаны',
          image: categories.find(c => c.id === newGiveawayCategory)?.icon || '🎁',
          isVip: newGiveawayIsVip,
          url: newGiveawayUrl,
          prizeImage: newGiveawayPrizeImage // Добавляем файл изображения
        };
        
        const result = await addGiveawayToDb(giveawayData);
        
        if (result.success) {
          setNewGiveawayTitle('');
          setNewGiveawayPrize('');
          setNewGiveawayDescription('');
          setNewGiveawayConditions('');
          setNewGiveawayPlatform('');
          setNewGiveawayUrl('');
          setNewGiveawayIsVip(false);
          clearPrizeImage();
          setShowCreateGiveaway(false);
        } else {
          console.error('Ошибка создания розыгрыша:', result.error);
          alert('Ошибка создания розыгрыша: ' + result.error);
        }
        
        setIsUploadingImage(false);
      }
    };

    const deleteGiveaway = (id) => {
      setGiveaways(giveaways.filter(g => g.id !== id));
    };

    const deleteCategory = (id) => {
      setCategories(categories.filter(c => c.id !== id));
      setGiveaways(giveaways.filter(g => g.category !== id));
    };

    const editCategory = (category) => {
      setEditingCategory(category);
      setNewCategoryName(category.name);
      setNewCategoryIcon(category.icon);
      setShowCreateCategory(true);
    };

    const updateCategory = () => {
      if (newCategoryName.trim() && newCategoryIcon.trim() && editingCategory) {
        setCategories(categories.map(cat => 
          cat.id === editingCategory.id 
            ? { ...cat, name: newCategoryName, icon: newCategoryIcon }
            : cat
        ));
        setNewCategoryName('');
        setNewCategoryIcon('');
        setEditingCategory(null);
        setShowCreateCategory(false);
      }
    };

    const editGiveaway = (giveaway) => {
      setEditingGiveaway(giveaway);
      setNewGiveawayTitle(giveaway.title);
      setNewGiveawayPrize(giveaway.prize);
      setNewGiveawayDescription(giveaway.description || '');
      setNewGiveawayConditions(giveaway.conditions || '');
      setNewGiveawayCategory(giveaway.category);
      setNewGiveawayPlatform(giveaway.platform);
      setNewGiveawayUrl(giveaway.url || '');
      setNewGiveawayIsVip(giveaway.isVip || false);
      
      // Устанавливаем превью текущего изображения
      if (giveaway.prizeImageUrl) {
        setPrizeImagePreview(giveaway.prizeImageUrl);
      } else {
        clearPrizeImage();
      }
      
      setShowCreateGiveaway(true);
    };

    const updateGiveaway = async () => {
      if (newGiveawayTitle.trim() && newGiveawayPrize.trim() && newGiveawayPlatform.trim() && newGiveawayUrl.trim() && editingGiveaway) {
        setIsUploadingImage(true);
        
        let prizeImageUrl = editingGiveaway.prizeImageUrl; // Сохраняем существующее изображение
        
        // Загружаем новое изображение, если оно выбрано
        if (newGiveawayPrizeImage) {
          const uploadResult = await uploadPrizeImage(newGiveawayPrizeImage);
          if (uploadResult.success) {
            prizeImageUrl = uploadResult.url;
          } else {
            console.error('Ошибка загрузки изображения:', uploadResult.error);
            
            // Проверяем, содержит ли ошибка информацию о размере строки
            if (uploadResult.error.includes('maximum size') || uploadResult.error.includes('8191')) {
              alert('Изображение слишком большое для базы данных. Попробуйте выбрать файл меньшего размера или настройте облачное хранилище Supabase.');
            } else {
              alert('Не удалось загрузить изображение в облачное хранилище. Розыгрыш будет сохранен без нового изображения. Ошибка: ' + uploadResult.error);
            }
            
            // Продолжаем с существующим изображением
            prizeImageUrl = editingGiveaway.prizeImageUrl;
          }
        }
        
        try {
          // Обновляем розыгрыш в базе данных
          const { error } = await supabase
            .from('giveaways')
            .update({
              title: newGiveawayTitle,
              prize: newGiveawayPrize,
              description: newGiveawayDescription || 'Описание приза не указано',
              conditions: newGiveawayConditions || 'Условия участия не указаны',
              category_id: newGiveawayCategory,
              platform: newGiveawayPlatform,
              url: newGiveawayUrl,
              prize_image_url: prizeImageUrl, // Может быть null, если загрузка не удалась
              is_vip: newGiveawayIsVip,
              updated_at: new Date().toISOString()
            })
            .eq('id', editingGiveaway.id);
          
          if (error) {
            // Проверяем ошибку размера строки
            if (error.message.includes('maximum size') || error.message.includes('8191')) {
              throw new Error('Данные слишком большие для сохранения в базе данных. Попробуйте использовать изображение меньшего размера.');
            }
            throw error;
          }
          
          // Перезагружаем данные
          await loadGiveaways();
          
          setNewGiveawayTitle('');
          setNewGiveawayPrize('');
          setNewGiveawayDescription('');
          setNewGiveawayConditions('');
          setNewGiveawayPlatform('');
          setNewGiveawayUrl('');
          setNewGiveawayIsVip(false);
          clearPrizeImage();
          setEditingGiveaway(null);
          setShowCreateGiveaway(false);
          
        } catch (error) {
          console.error('Ошибка обновления розыгрыша:', error);
          alert('Ошибка при обновлении розыгрыша: ' + error.message);
        }
        
        setIsUploadingImage(false);
      }
    };

    return (
      <div className="space-y-8">
        <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{userName}</h2>
              <p className="text-orange-400">Администратор</p>
            </div>
          </div>
          
          <div className="flex justify-end pt-4 border-t border-gray-700">
            <button 
              onClick={() => {
                const currentUser = registeredUsers.find(u => u.name === userName);
                if (currentUser) {
                  setRegisteredUsers(registeredUsers.map(u => 
                    u.id === currentUser.id 
                      ? { ...u, participatingGiveaways: participatingGiveaways }
                      : u
                  ));
                }
                
                // Очищаем состояние аутентификации
                clearAuthState();
                
                setIsRegistered(false);
                setUserName('');
                setUserRole('user');
                setCurrentUserId(null);
                setParticipatingGiveaways([]);
                setCurrentView('home');
              }}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200"
            >
              Выйти из аккаунта
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-4 sm:p-6">
            <h3 className="text-sm sm:text-lg font-semibold text-white mb-2">Всего пользователей</h3>
            <p className="text-2xl sm:text-3xl font-bold text-cyan-400">{analytics.totalUsers.toLocaleString()}</p>
            <p className="text-xs text-gray-400 mt-1">Зарегистрированных</p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-4 sm:p-6">
            <h3 className="text-sm sm:text-lg font-semibold text-white mb-2">Активность сегодня</h3>
            <p className="text-2xl sm:text-3xl font-bold text-green-400">{analytics.dailyActiveUsers.toLocaleString()}</p>
            <p className="text-xs text-gray-400 mt-1">Уникальных посетителей</p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-4 sm:p-6">
            <h3 className="text-sm sm:text-lg font-semibold text-white mb-2">За неделю</h3>
            <p className="text-2xl sm:text-3xl font-bold text-purple-400">{analytics.weeklyActiveUsers.toLocaleString()}</p>
            <p className="text-xs text-gray-400 mt-1">Активных пользователей</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-4 sm:p-6">
            <h3 className="text-sm sm:text-lg font-semibold text-white mb-2">За месяц</h3>
            <p className="text-2xl sm:text-3xl font-bold text-orange-400">{analytics.monthlyActiveUsers.toLocaleString()}</p>
            <p className="text-xs text-gray-400 mt-1">Активных пользователей</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-4 sm:p-6">
            <h3 className="text-sm sm:text-lg font-semibold text-white mb-2">Всего розыгрышей</h3>
            <p className="text-2xl sm:text-3xl font-bold text-blue-400">{analytics.totalGiveaways.toLocaleString()}</p>
            <p className="text-xs text-gray-400 mt-1">Активных конкурсов</p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-4 sm:p-6">
            <h3 className="text-sm sm:text-lg font-semibold text-white mb-2">Всего участий</h3>
            <p className="text-2xl sm:text-3xl font-bold text-yellow-400">{analytics.totalParticipations.toLocaleString()}</p>
            <p className="text-xs text-gray-400 mt-1">Участий в розыгрышах</p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-4 sm:p-6">
            <h3 className="text-sm sm:text-lg font-semibold text-white mb-2">Уникальные просмотры</h3>
            <p className="text-2xl sm:text-3xl font-bold text-purple-400">{analytics.totalUniqueViews.toLocaleString()}</p>
            <p className="text-xs text-gray-400 mt-1">Индивидуальных пользователей</p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-4 sm:p-6">
            <h3 className="text-sm sm:text-lg font-semibold text-white mb-2">Уникальных участников</h3>
            <p className="text-2xl sm:text-3xl font-bold text-pink-400">{analytics.uniqueParticipants.toLocaleString()}</p>
            <p className="text-xs text-gray-400 mt-1">Индивидуальных пользователей</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-4 sm:p-6">
            <h3 className="text-sm sm:text-lg font-semibold text-white mb-2">Средние просмотры</h3>
            <p className="text-2xl sm:text-3xl font-bold text-teal-400">{Number(analytics.avgViewsPerGiveaway).toFixed(1)}</p>
            <p className="text-xs text-gray-400 mt-1">На розыгрыш</p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-4 sm:p-6">
            <h3 className="text-sm sm:text-lg font-semibold text-white mb-2">Категории</h3>
            <p className="text-2xl sm:text-3xl font-bold text-indigo-400">{categories.length}</p>
            <p className="text-xs text-gray-400 mt-1">Доступных</p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-4 sm:p-6">
            <h3 className="text-sm sm:text-lg font-semibold text-white mb-2">Активность</h3>
            <p className="text-2xl sm:text-3xl font-bold text-emerald-400">{analytics.dailyActiveUsers.toLocaleString()}</p>
            <p className="text-xs text-gray-400 mt-1">Пользователей сегодня</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <button 
            onClick={() => setShowCreateGiveaway(true)}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Создать розыгрыш</span>
          </button>
          
          <button 
            onClick={() => setShowCreateCategory(true)}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Создать категорию</span>
          </button>
        </div>

        {showCreateCategory && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-bold text-white mb-4">
                {editingCategory ? 'Редактировать категорию' : 'Создать категорию'}
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Название категории"
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                />
                <input
                  type="text"
                  value={newCategoryIcon}
                  onChange={(e) => setNewCategoryIcon(e.target.value)}
                  placeholder="Иконка (emoji)"
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                />
                <div className="flex space-x-2">
                  <button 
                    onClick={editingCategory ? updateCategory : addCategory}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200"
                  >
                    {editingCategory ? 'Сохранить' : 'Создать'}
                  </button>
                  <button 
                    onClick={() => {
                      setShowCreateCategory(false);
                      setEditingCategory(null);
                      setNewCategoryName('');
                      setNewCategoryIcon('');
                    }}
                    className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200"
                  >
                    Отмена
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showCreateGiveaway && (
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowCreateGiveaway(false);
                setEditingGiveaway(null);
                setNewGiveawayTitle('');
                setNewGiveawayPrize('');
                setNewGiveawayDescription('');
                setNewGiveawayConditions('');
                setNewGiveawayPlatform('');
                setNewGiveawayIsVip(false);
              }
            }}
          >
            <div className="bg-gray-800 border border-gray-700 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">
                  {editingGiveaway ? 'Редактировать розыгрыш' : 'Создать розыгрыш'}
                </h3>
                <button 
                  onClick={() => {
                    setShowCreateGiveaway(false);
                    setEditingGiveaway(null);
                    setNewGiveawayTitle('');
                    setNewGiveawayPrize('');
                    setNewGiveawayDescription('');
                    setNewGiveawayConditions('');
                    setNewGiveawayPlatform('');
                    setNewGiveawayUrl('');
                    setNewGiveawayIsVip(false);
                    clearPrizeImage();
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="bg-gray-700/30 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Название розыгрыша
                  </label>
                  <input
                    type="text"
                    value={newGiveawayTitle}
                    onChange={(e) => setNewGiveawayTitle(e.target.value)}
                    placeholder="iPhone 15 Pro"
                    className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="bg-gray-700/30 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Описание приза
                  </label>
                  <input
                    type="text"
                    value={newGiveawayPrize}
                    onChange={(e) => setNewGiveawayPrize(e.target.value)}
                    placeholder="iPhone 15 Pro Max 256GB"
                    className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="bg-gray-700/30 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Подробное описание приза
                  </label>
                  <textarea
                    value={newGiveawayDescription}
                    onChange={(e) => setNewGiveawayDescription(e.target.value)}
                    placeholder="Новейший iPhone 15 Pro Max с 256GB памяти. Включает все аксессуары и официальную гарантию Apple."
                    rows="3"
                    className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 resize-none"
                  />
                </div>

                <div className="bg-gray-700/30 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Условия участия
                  </label>
                  <textarea
                    value={newGiveawayConditions}
                    onChange={(e) => setNewGiveawayConditions(e.target.value)}
                    placeholder="Для участия необходимо: подписаться на канал, сделать репост записи, отметить 3 друзей в комментариях. Победитель определяется случайным образом."
                    rows="4"
                    className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 resize-none"
                  />
                </div>

                <div className="bg-gray-700/30 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Категория
                  </label>
                  <select
                    value={newGiveawayCategory}
                    onChange={(e) => setNewGiveawayCategory(parseInt(e.target.value))}
                    className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className="bg-gray-700/30 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Платформа
                  </label>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-300 mb-2">Выберите платформу</div>
                    <div className="space-y-2">
                      {[
                        { value: 'Telegram', label: 'Telegram' },
                        { value: 'VK', label: 'VK' },
                        { value: 'YouTube', label: 'YouTube' },
                        { value: 'TikTok', label: 'TikTok' }
                      ].map((platform) => (
                        <label key={platform.value} className="flex items-center space-x-3 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer">
                          <input
                            type="radio"
                            name="platform"
                            value={platform.value}
                            checked={newGiveawayPlatform === platform.value}
                            onChange={(e) => setNewGiveawayPlatform(e.target.value)}
                            className="w-4 h-4 text-cyan-500 bg-gray-700 border-gray-600 focus:ring-cyan-500 focus:ring-2"
                          />
                          <div className="flex items-center space-x-2">
                            <PlatformIcon platform={platform.value} />
                            <span className="text-white">{platform.label}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700/30 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Ссылка на розыгрыш
                  </label>
                  <input
                    type="url"
                    value={newGiveawayUrl}
                    onChange={(e) => setNewGiveawayUrl(e.target.value)}
                    placeholder="https://t.me/channel/post или https://vk.com/wall-123_456"
                    className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Укажите прямую ссылку на пост с розыгрышем в соцсети. По этой ссылке пользователи будут переходить для участия.
                  </p>
                </div>

                <div className="bg-gray-700/30 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Изображение приза
                  </label>
                  
                  {prizeImagePreview && (
                    <div className="mb-4">
                      <div className="relative inline-block">
                        <img 
                          src={prizeImagePreview} 
                          alt="Превью приза"
                          className="w-32 h-32 object-cover rounded-lg border border-gray-600"
                        />
                        <button
                          type="button"
                          onClick={clearPrizeImage}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <input
                    id="prize-image-input"
                    type="file"
                    accept="image/*"
                    onChange={handlePrizeImageChange}
                    className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-cyan-500 file:text-white hover:file:bg-cyan-600 file:cursor-pointer"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Загрузите изображение приза (JPG, PNG, GIF). Максимальный размер: 5MB. 
                    Если изображение не загружено, будет использоваться иконка категории.
                  </p>
                </div>

                <div className="bg-gray-700/30 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="vipStatus"
                      checked={newGiveawayIsVip}
                      onChange={(e) => setNewGiveawayIsVip(e.target.checked)}
                      className="w-4 h-4 text-yellow-400 bg-gray-700 border-gray-600 rounded focus:ring-yellow-500 focus:ring-2"
                    />
                    <label htmlFor="vipStatus" className="flex items-center space-x-2 text-sm font-medium text-gray-300 cursor-pointer">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span>VIP розыгрыш (отображается выше в списке)</span>
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    VIP розыгрыши имеют приоритет в отображении и выделяются золотой звездой
                  </p>
                </div>
              </div>

              <div className="sticky bottom-0 bg-gray-800 border-t border-gray-700 p-6">
                <div className="flex space-x-4">
                  <button 
                    onClick={editingGiveaway ? updateGiveaway : addGiveaway}
                    disabled={isUploadingImage}
                    className={`flex-1 px-6 py-3 rounded-lg transition-all duration-200 font-semibold ${
                      isUploadingImage
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600'
                    }`}
                  >
                    {isUploadingImage ? 'Сохранение...' : (editingGiveaway ? 'Сохранить' : 'Создать')}
                  </button>
                  <button 
                    onClick={() => {
                      setShowCreateGiveaway(false);
                      setEditingGiveaway(null);
                      setNewGiveawayTitle('');
                      setNewGiveawayPrize('');
                      setNewGiveawayDescription('');
                      setNewGiveawayConditions('');
                      setNewGiveawayPlatform('');
                      setNewGiveawayUrl('');
                      setNewGiveawayIsVip(false);
                      clearPrizeImage();
                    }}
                    disabled={isUploadingImage}
                    className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Отмена
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Управление категориями</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((category) => (
              <div key={category.id} className="p-4 bg-gray-700/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2 min-w-0">
                    <span className="text-2xl flex-shrink-0">{category.icon}</span>
                    <span className="text-white font-medium truncate">{category.name}</span>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <button 
                      onClick={() => editCategory(category)}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <Settings className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => deleteCategory(category.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-400">
                  {giveaways.filter(g => g.category === category.id).length} розыгрышей
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Аналитика розыгрышей</h3>
          <div className="space-y-4">
            {sortedGiveaways.map((giveaway) => {
              const giveawayStatData = giveawayStats[giveaway.id];
              const realParticipants = giveaway.participants; // Уже загружается из базы как реальное количество
              
              return (
                <div key={giveaway.id} className={`bg-gray-700/30 rounded-lg p-4 ${giveaway.isVip ? 'border border-yellow-400/30' : ''}`}>
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="w-12 h-12 flex items-center justify-center">
                      {giveaway.prizeImageUrl ? (
                        <img 
                          src={giveaway.prizeImageUrl} 
                          alt={giveaway.title}
                          className="w-12 h-12 object-cover rounded-lg"
                          onError={(e) => {
                            // Fallback к эмодзи при ошибке загрузки
                            e.target.style.display = 'none';
                            e.target.nextElementSibling.style.display = 'block';
                          }}
                        />
                      ) : null}
                      <div 
                        className="text-2xl" 
                        style={{ display: giveaway.prizeImageUrl ? 'none' : 'block' }}
                      >
                        {giveaway.image}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-white">{giveaway.title}</h4>
                        {giveaway.isVip && (
                          <div className="flex items-center space-x-1 text-yellow-400">
                            <Star className="h-3 w-3 fill-current" />
                            <span className="text-xs">VIP</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-1">
                        <PlatformIcon platform={giveaway.platform} />
                        <p className="text-sm text-gray-400">{giveaway.platform}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Участники</p>
                      <p className="text-lg font-bold text-cyan-400">{realParticipants.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">зарегистрированных</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Просмотры</p>
                      <p className="text-lg font-bold text-green-400">{giveaway.views.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">всего просмотров</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-400">За неделю</p>
                      <p className="text-lg font-bold text-purple-400">{giveawayStatData?.recentParticipations || 0}</p>
                      <p className="text-xs text-gray-500">новых участников</p>
                    </div>
                  </div>

                  {giveawayStatData && giveawayStatData.participants && giveawayStatData.participants.length > 0 && (
                    <div className="mb-3 p-3 bg-gray-600/30 rounded-lg">
                      <h5 className="text-sm font-semibold text-white mb-2">Последние участники:</h5>
                      <div className="space-y-1 max-h-20 overflow-y-auto">
                        {giveawayStatData.participants.slice(-5).reverse().map((participant, index) => (
                          <div key={index} className="flex justify-between text-xs">
                            <span className="text-gray-300 truncate flex-1">
                              {participant.userName}
                            </span>
                            <span className="text-gray-400 ml-2">
                              {new Date(participant.participatedAt).toLocaleDateString('ru-RU')}
                            </span>
                          </div>
                        ))}
                      </div>
                      {giveawayStatData.participants.length > 5 && (
                        <p className="text-xs text-gray-500 mt-2">
                          И еще {giveawayStatData.participants.length - 5} участников...
                        </p>
                      )}
                    </div>
                  )}
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => editGiveaway(giveaway)}
                      className="flex-1 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                    >
                      Редактировать
                    </button>
                    <button 
                      onClick={() => deleteGiveaway(giveaway.id)}
                      className="flex-1 px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage />;
      case 'categories':
        return <CategoriesPage />;
      case 'giveaways':
        return <GiveawaysPage />;
      case 'register':
        return <RegisterPage />;
      case 'login':
        return <LoginPage />;
      case 'profile':
        return userRole === 'admin' ? <AdminProfile /> : <UserProfile />;
      default:
        return <HomePage />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Загрузка данных...</h2>
          <p className="text-gray-400">Подключение к базе данных</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
      onClick={(e) => {
        if (!e.target.closest('.relative')) {
          setShowCategoryMenu(false);
        }
      }}
    >
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <Navigation />
      
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderCurrentView()}
      </main>

      {showRulesModal && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowRulesModal(false);
            }
          }}
        >
          <div className="bg-gray-800 border border-gray-700 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Правила и условия использования</h2>
              <button 
                onClick={() => setShowRulesModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-yellow-400 text-xl">⚠️</span>
                  <h3 className="text-lg font-semibold text-yellow-400">Важное уведомление</h3>
                </div>
                <p className="text-gray-300 text-sm">
                  Пожалуйста, внимательно ознакомьтесь с правилами использования нашего сервиса перед участием в розыгрышах.
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                    <span className="text-cyan-400">1.</span>
                    <span>Характер деятельности сервиса</span>
                  </h3>
                  <div className="space-y-2 text-gray-300 text-sm">
                    <p>• Наш сервис является <strong>информационным агрегатором</strong> розыгрышей</p>
                    <p>• Мы <strong>не проводим</strong> розыгрыши самостоятельно</p>
                    <p>• Размещаем только информацию о розыгрышах, проводимых третьими лицами</p>
                    <p>• Все розыгрыши проводятся организаторами из социальных сетей и мессенджеров</p>
                  </div>
                </div>

                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                    <span className="text-cyan-400">2.</span>
                    <span>Ответственность за проведение розыгрышей</span>
                  </h3>
                  <div className="space-y-2 text-gray-300 text-sm">
                    <p>• <strong>Организаторы розыгрышей</strong> несут полную ответственность за:</p>
                    <p className="ml-4">- Соблюдение заявленных условий участия</p>
                    <p className="ml-4">- Своевременное проведение розыгрыша</p>
                    <p className="ml-4">- Выдачу призов победителям</p>
                    <p className="ml-4">- Изменение сроков и условий розыгрыша</p>
                    <p>• Наш сервис <strong>не контролирует</strong> процесс проведения розыгрышей</p>
                  </div>
                </div>

                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                    <span className="text-cyan-400">3.</span>
                    <span>Изменение условий розыгрышей</span>
                  </h3>
                  <div className="space-y-2 text-gray-300 text-sm">
                    <p>• Все изменения условий участия принимаются <strong>исключительно организаторами</strong></p>
                    <p>• Изменение дат окончания розыгрышей производится <strong>не нами</strong></p>
                    <p>• При получении информации об изменениях мы обновляем данные в кратчайшие сроки</p>
                    <p>• Рекомендуем дополнительно проверять актуальную информацию у организаторов</p>
                  </div>
                </div>

                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                    <span className="text-cyan-400">4.</span>
                    <span>Критерии размещения розыгрышей</span>
                  </h3>
                  <div className="space-y-2 text-gray-300 text-sm">
                    <p>• Размещаем <strong>только бесплатные</strong> розыгрыши</p>
                    <p>• <strong>Запрещено</strong> размещение розыгрышей, требующих:</p>
                    <p className="ml-4">- Покупки товаров или услуг</p>
                    <p className="ml-4">- Внесения любых денежных средств</p>
                    <p className="ml-4">- Оплаты участия в розыгрыше</p>
                    <p>• При выявлении нарушений розыгрыш <strong>удаляется немедленно</strong></p>
                  </div>
                </div>

                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                    <span className="text-cyan-400">5.</span>
                    <span>Права администрации сервиса</span>
                  </h3>
                  <div className="space-y-2 text-gray-300 text-sm">
                    <p>• Оставляем за собой право <strong>удалять розыгрыши</strong> по собственному усмотрению</p>
                    <p>• Основания для удаления:</p>
                    <p className="ml-4">- Несоответствие критериям размещения</p>
                    <p className="ml-4">- Подозрительная активность организаторов</p>
                    <p className="ml-4">- Жалобы пользователей</p>
                    <p className="ml-4">- Технические причины</p>
                    <p>• Решение об удалении принимается <strong>без предварительного уведомления</strong></p>
                  </div>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-red-400 mb-3 flex items-center space-x-2">
                    <span className="text-red-400">6.</span>
                    <span>Ограничение ответственности</span>
                  </h3>
                  <div className="space-y-2 text-gray-300 text-sm">
                    <p>• <strong>Не несем ответственность</strong> за:</p>
                    <p className="ml-4">- Получение или неполучение призов</p>
                    <p className="ml-4">- Действия или бездействие организаторов</p>
                    <p className="ml-4">- Изменение условий участия третьими лицами</p>
                    <p className="ml-4">- Отмену розыгрышей организаторами</p>
                    <p className="ml-4">- Качество и соответствие призов заявленным характеристикам</p>
                    <p>• <strong>Участие в розыгрышах</strong> осуществляется <strong>на ваш страх и риск</strong></p>
                  </div>
                </div>

                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                    <span className="text-cyan-400">7.</span>
                    <span>Рекомендации пользователям</span>
                  </h3>
                  <div className="space-y-2 text-gray-300 text-sm">
                    <p>• Внимательно изучайте условия участия у организаторов</p>
                    <p>• Проверяйте актуальность информации в официальных источниках</p>
                    <p>• Не передавайте персональные данные третьим лицам</p>
                    <p>• Сообщайте нам о подозрительных розыгрышах</p>
                    <p>• Помните: <strong>честные розыгрыши всегда бесплатны</strong></p>
                  </div>
                </div>

                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                    <span className="text-cyan-400">8.</span>
                    <span>Изменения в правилах</span>
                  </h3>
                  <div className="space-y-2 text-gray-300 text-sm">
                    <p>• Правила могут быть изменены без предварительного уведомления</p>
                    <p>• Актуальная версия правил всегда доступна в приложении</p>
                    <p>• Продолжение использования сервиса означает согласие с изменениями</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-blue-400 text-xl">ℹ️</span>
                  <h3 className="text-lg font-semibold text-blue-400">Важно помнить</h3>
                </div>
                <p className="text-gray-300 text-sm">
                  Используя наш сервис, вы подтверждаете, что ознакомились с данными правилами и согласны с ними. 
                  Мы стремимся предоставлять только достоверную информацию о честных и бесплатных розыгрышах.
                </p>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-800 border-t border-gray-700 p-6">
              <button 
                onClick={() => setShowRulesModal(false)}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 font-semibold"
              >
                Понятно, закрыть
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedGiveaway && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedGiveaway(null);
            }
          }}
        >
          <div className="bg-gray-800 border border-gray-700 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 flex items-center justify-center">
                  {selectedGiveaway.prizeImageUrl ? (
                    <img 
                      src={selectedGiveaway.prizeImageUrl} 
                      alt={selectedGiveaway.title}
                      className="w-16 h-16 object-cover rounded-lg"
                      onError={(e) => {
                        // Fallback к эмодзи при ошибке загрузки
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'block';
                      }}
                    />
                  ) : null}
                  <div 
                    className="text-4xl" 
                    style={{ display: selectedGiveaway.prizeImageUrl ? 'none' : 'block' }}
                  >
                    {selectedGiveaway.image}
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedGiveaway.title}</h2>
                  <div className="flex items-center space-x-2 mt-1">
                    <PlatformIcon platform={selectedGiveaway.platform} />
                    <span className="text-gray-400">{selectedGiveaway.platform}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setSelectedGiveaway(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-gray-700/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">Приз</h3>
                <p className="text-cyan-400 font-medium mb-2">{selectedGiveaway.prize}</p>
                <p className="text-gray-300 text-sm">{selectedGiveaway.description}</p>
              </div>

              <div className="bg-gray-700/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">Категория</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{categories.find(c => c.id === selectedGiveaway.category)?.icon}</span>
                  <span className="text-gray-300">{categories.find(c => c.id === selectedGiveaway.category)?.name}</span>
                </div>
              </div>

              <div className="bg-gray-700/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">Условия участия</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{selectedGiveaway.conditions}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700/30 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-400 mb-1">Участников</p>
                  <p className="text-xl font-bold text-cyan-400">{selectedGiveaway.participants.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">зарегистрированных пользователей</p>
                </div>
                <div className="bg-gray-700/30 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-400 mb-1">Осталось времени</p>
                  <p className="text-xl font-bold text-orange-400">{selectedGiveaway.timeLeft}</p>
                </div>
              </div>

              <div className="bg-gray-700/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">Дата завершения</h3>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-300">{new Date(selectedGiveaway.endDate).toLocaleDateString('ru-RU', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-800 border-t border-gray-700 p-6">
              <button 
                onClick={async () => {
                  if (isRegistered) {
                    // Сначала добавляем участие, если пользователь еще не участвует
                    if (!participatingGiveaways.includes(selectedGiveaway.id)) {
                      const result = await participateInGiveaway(currentUserId, selectedGiveaway.id);
                      if (result.success) {
                        // Обновляем локальное состояние сразу для лучшего UX
                        setParticipatingGiveaways([...participatingGiveaways, selectedGiveaway.id]);
                        
                        // Обновляем статистику и аналитику
                        await Promise.all([
                          loadAnalytics(),
                          loadGiveawayStats()
                        ]);
                      } else {
                        console.error('Ошибка участия:', result.error);
                        alert('Ошибка при участии в розыгрыше: ' + result.error);
                        return;
                      }
                    }
                    
                    // Затем открываем ссылку на розыгрыш
                    if (selectedGiveaway.url) {
                      window.open(selectedGiveaway.url, '_blank');
                    }
                    
                    setSelectedGiveaway(null);
                  } else {
                    setSelectedGiveaway(null);
                    setCurrentView('login');
                  }
                }}
                className="w-full py-3 rounded-lg font-semibold transition-all duration-200 bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105"
              >
                {isRegistered 
                  ? participatingGiveaways.includes(selectedGiveaway.id)
                    ? 'Перейти к розыгрышу' 
                    : 'Участвовать'
                  : 'Войти для участия'
                }
              </button>
              
              {isRegistered && participatingGiveaways.includes(selectedGiveaway.id) && (
                <div className="mt-3 flex items-center justify-center space-x-2 text-green-400 text-sm">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span>✅ Вы участвуете в этом розыгрыше</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showPrivacyModal && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowPrivacyModal(false);
            }
          }}
        >
          <div className="bg-gray-800 border border-gray-700 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Правила конфиденциальности</h2>
              <button 
                onClick={() => setShowPrivacyModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-blue-400 text-xl">🔒</span>
                  <h3 className="text-lg font-semibold text-blue-400">Защита ваших данных</h3>
                </div>
                <p className="text-gray-300 text-sm">
                  Мы серьезно относимся к защите ваших персональных данных и соблюдаем все требования законодательства о персональных данных.
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                    <span className="text-cyan-400">1.</span>
                    <span>Какие данные мы собираем</span>
                  </h3>
                  <div className="space-y-2 text-gray-300 text-sm">
                    <p><strong>Обязательные данные при регистрации:</strong></p>
                    <p>• Имя пользователя (никнейм) для идентификации в системе</p>
                    <p>• Адрес электронной почты для создания аккаунта и связи</p>
                    <p>• Пароль в зашифрованном виде для доступа к аккаунту</p>
                    <p><strong>Автоматически собираемые данные:</strong></p>
                    <p>• Дата и время регистрации и последней активности</p>
                    <p>• Информация об участии в розыгрышах (какие розыгрыши, когда)</p>
                    <p>• Статистика активности для улучшения сервиса</p>
                    <p>• Технические данные: IP-адрес, браузер, устройство (для безопасности)</p>
                  </div>
                </div>

                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                    <span className="text-cyan-400">2.</span>
                    <span>Как мы используем ваши данные</span>
                  </h3>
                  <div className="space-y-2 text-gray-300 text-sm">
                    <p>• <strong>Предоставление сервиса:</strong> создание аккаунта, участие в розыгрышах, персонализация</p>
                    <p>• <strong>Связь с пользователями:</strong> уведомления о важных изменениях, ответы на вопросы</p>
                    <p>• <strong>Безопасность:</strong> предотвращение мошенничества, защита от злоупотреблений</p>
                    <p>• <strong>Аналитика:</strong> улучшение работы платформы, анализ популярности функций</p>
                    <p>• <strong>Соблюдение законов:</strong> выполнение требований законодательства</p>
                    <p><strong>Мы НЕ используем данные для:</strong></p>
                    <p>• Продажи третьим лицам</p>
                    <p>• Спама или нежелательной рекламы</p>
                    <p>• Передачи организаторам розыгрышей без вашего согласия</p>
                  </div>
                </div>

                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                    <span className="text-cyan-400">3.</span>
                    <span>Передача данных третьим лицам</span>
                  </h3>
                  <div className="space-y-2 text-gray-300 text-sm">
                    <p><strong>Мы можем передавать данные только в следующих случаях:</strong></p>
                    <p>• <strong>С вашего согласия:</strong> при участии в розыгрышах (только необходимый минимум)</p>
                    <p>• <strong>Поставщикам услуг:</strong> хостинг, аналитика (с обязательствами конфиденциальности)</p>
                    <p>• <strong>По требованию закона:</strong> при официальных запросах государственных органов</p>
                    <p>• <strong>Защита прав:</strong> для защиты наших прав, безопасности пользователей</p>
                    <p><strong>Во всех случаях:</strong></p>
                    <p>• Передается минимально необходимый объем данных</p>
                    <p>• Получатели обязуются обеспечить защиту данных</p>
                    <p>• Вы имеете право знать о таких передачах</p>
                  </div>
                </div>

                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                    <span className="text-cyan-400">4.</span>
                    <span>Хранение и защита данных</span>
                  </h3>
                  <div className="space-y-2 text-gray-300 text-sm">
                    <p><strong>Безопасность:</strong></p>
                    <p>• Все пароли хранятся в зашифрованном виде</p>
                    <p>• Используется защищенное соединение (HTTPS)</p>
                    <p>• Регулярное резервное копирование данных</p>
                    <p>• Ограниченный доступ сотрудников к персональным данным</p>
                    <p><strong>Сроки хранения:</strong></p>
                    <p>• Данные аккаунта: пока аккаунт активен + 1 год после удаления</p>
                    <p>• История участий: 3 года для статистики и аналитики</p>
                    <p>• Технические логи: до 12 месяцев</p>
                    <p>• Можете запросить досрочное удаление всех данных</p>
                  </div>
                </div>

                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                    <span className="text-cyan-400">5.</span>
                    <span>Ваши права</span>
                  </h3>
                  <div className="space-y-2 text-gray-300 text-sm">
                    <p><strong>Вы имеете право:</strong></p>
                    <p>• <strong>Доступ:</strong> узнать, какие данные мы о вас храним</p>
                    <p>• <strong>Исправление:</strong> изменить неточные или устаревшие данные</p>
                    <p>• <strong>Удаление:</strong> потребовать удалить ваши данные ("право на забвение")</p>
                    <p>• <strong>Ограничение:</strong> ограничить обработку ваших данных</p>
                    <p>• <strong>Переносимость:</strong> получить данные в удобном формате</p>
                    <p>• <strong>Возражение:</strong> возразить против обработки данных</p>
                    <p>• <strong>Жалоба:</strong> подать жалобу в надзорный орган</p>
                    <p><strong>Как воспользоваться правами:</strong> свяжитесь с нами через профиль или email</p>
                  </div>
                </div>

                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                    <span className="text-cyan-400">6.</span>
                    <span>Cookies и отслеживание</span>
                  </h3>
                  <div className="space-y-2 text-gray-300 text-sm">
                    <p><strong>Мы используем:</strong></p>
                    <p>• <strong>Необходимые cookies:</strong> для работы сайта, авторизации</p>
                    <p>• <strong>Аналитические cookies:</strong> для понимания как используется сайт</p>
                    <p>• <strong>Локальное хранилище:</strong> для сохранения настроек пользователя</p>
                    <p><strong>Вы можете:</strong></p>
                    <p>• Настроить cookies в вашем браузере</p>
                    <p>• Отключить аналитические cookies (функциональность сохранится)</p>
                    <p>• Очистить данные сайта в любое время</p>
                  </div>
                </div>

                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                    <span className="text-cyan-400">7.</span>
                    <span>Дети и несовершеннолетние</span>
                  </h3>
                  <div className="space-y-2 text-gray-300 text-sm">
                    <p>• Наш сервис предназначен для лиц старше 13 лет</p>
                    <p>• Пользователи от 13 до 18 лет должны получить согласие родителей</p>
                    <p>• При выявлении аккаунта ребенка младше 13 лет - аккаунт удаляется</p>
                    <p>• Родители могут запросить доступ к данным своих детей</p>
                    <p>• Особая защита применяется к данным несовершеннолетних</p>
                  </div>
                </div>

                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                    <span className="text-cyan-400">8.</span>
                    <span>Изменения в политике</span>
                  </h3>
                  <div className="space-y-2 text-gray-300 text-sm">
                    <p>• Мы можем обновлять эту политику конфиденциальности</p>
                    <p>• О существенных изменениях уведомим по email за 30 дней</p>
                    <p>• Текущая версия всегда доступна в приложении</p>
                    <p>• Дата последнего обновления указана в начале документа</p>
                    <p>• Продолжение использования после изменений означает согласие с ними</p>
                  </div>
                </div>

                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                    <span className="text-cyan-400">9.</span>
                    <span>Контактная информация</span>
                  </h3>
                  <div className="space-y-2 text-gray-300 text-sm">
                    <p><strong>По вопросам конфиденциальности обращайтесь:</strong></p>
                    <p>• Email: privacy@prizehub.com</p>
                    <p>• Через форму обратной связи в приложении</p>
                    <p>• Ответ в течение 7 рабочих дней</p>
                    <p><strong>Ответственный за обработку данных:</strong></p>
                    <p>• Администрация PrizeHub</p>
                    <p>• Уполномоченное лицо по защите данных</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-green-400 text-xl">✅</span>
                  <h3 className="text-lg font-semibold text-green-400">Последнее обновление</h3>
                </div>
                <p className="text-gray-300 text-sm">
                  Данная политика конфиденциальности была обновлена 19 июля 2025 года. 
                  Мы стремимся обеспечить максимальную прозрачность в вопросах обработки ваших данных.
                </p>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-800 border-t border-gray-700 p-6">
              <div className="flex space-x-4">
                <button 
                  onClick={() => {
                    setPrivacyAgreed(true);
                    setShowPrivacyModal(false);
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 font-semibold"
                >
                  Согласиться и закрыть
                </button>
                <button 
                  onClick={() => setShowPrivacyModal(false)}
                  className="flex-1 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 font-semibold"
                >
                  Просто закрыть
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GiveawayApp;
