package com.example.lauraapp.ui.notifications

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import com.example.lauraapp.R

class NotificationsFragment : Fragment() {

    private lateinit var notificationsViewModel: NotificationsViewModel

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        notificationsViewModel =
                ViewModelProviders.of(this).get(NotificationsViewModel::class.java)
        val root = inflater.inflate(R.layout.fragment_notifications, container, false)

        val myWebView2: WebView = root.findViewById(R.id.web_notification)

        val webSettings = myWebView2.getSettings()
        webSettings.setJavaScriptEnabled(true)
        webSettings.setDatabaseEnabled(true)

        myWebView2.loadUrl("file:///android_asset/www/LStars.html")
        myWebView2.webViewClient = WebViewClient()

        return root
    }
}